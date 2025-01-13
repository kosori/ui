import * as p from '@clack/prompts';

import type { ComponentIndex, InitOptions } from '../schema';
import type { Config } from '~/schema';
import { installDependencies } from '~/utils/dependencies';
import { fetchJsonFromApi } from '~/utils/fetch';
import { writeFiles } from '~/utils/files';
import { ComponentJson, ComponentsIndices } from '../schema';
import { transformContent } from './transform';

export class ComponentManager {
  private readonly config: Config;
  private readonly options: InitOptions;

  constructor(config: Config, options: InitOptions) {
    this.config = config;
    this.options = options;
  }

  /**
   * Fetches and parses the component index JSON file
   * @returns Parsed component index data
   */
  private fetchComponentIndices = async () => {
    const indexData = await fetchJsonFromApi('components/index.json');
    return ComponentsIndices.parse(indexData);
  };

  /**
   * Fetches and parses a single component by name
   */
  private fethcComponentJson = async (name: string) => {
    const componentData = await fetchJsonFromApi(`components/${name}.json`);
    return ComponentJson.parse(componentData);
  };

  /**
   * Fetches and parses multiple components by their names
   */
  private fetchComponentsJson = async (names: string[]) => {
    return await Promise.all(
      names.map((name) => this.fethcComponentJson(name)),
    );
  };

  private buildComponentHint = (
    required?: string[],
    dependencies?: string[],
  ) => {
    const usesComponents = required?.length;
    const usesDependencies = dependencies?.length;
    const usesBoth = usesComponents && usesDependencies;

    if (!usesDependencies && !usesComponents) return '';

    return `Will install ${usesComponents ? 'other component(s)' : ''}${
      usesBoth ? ' and ' : ''
    }${usesDependencies ? 'dependency(ies)' : ''}`;
  };

  private handleCancellation = () => {
    p.cancel(
      'Operation cancelled. No components were added to your project.\n   Please enter/select components to add.',
    );
    process.exit(0);
  };

  /**
   * Prompts user to select components if none were specified
   */
  private promptForComponentSelection = async (indices: ComponentIndex[]) => {
    const selectedComponents = await p.multiselect({
      message: 'Which components would you like to add?',
      options: indices.map(({ name, required, dependencies }) => ({
        value: name,
        label: name,
        hint: this.buildComponentHint(required, dependencies),
      })),
      required: true,
    });

    if (p.isCancel(selectedComponents)) return this.handleCancellation();

    return Array.from(new Set(selectedComponents));
  };

  private tansformComponents = async (components: ComponentJson[]) => {
    return Promise.all(
      components.map(async (component) => ({
        ...component,
        content: await transformContent({
          name: `${component.name}.tsx`,
          content: component.content,
          moduleMappings: [
            { specifier: '@kosori/ui', alias: this.config.aliases.ui },
          ],
        }),
      })),
    );
  };

  private extractDependencies(components: ComponentJson[]): string[] {
    return [...new Set(components.flatMap((c) => c.dependencies ?? []))];
  }

  private confirmInstallation = async () => {
    const shouldContinue = await p.confirm({
      message: 'Add components. Proceed?',
    });

    return !p.isCancel(shouldContinue) && shouldContinue;
  };

  private writeComponentFiles = async (components: ComponentJson[]) => {
    const componentsAlreadyCreated = await writeFiles({
      targetDir: this.config.resolvedPaths.ui,
      overwrite: this.options.all ? true : this.options.overwrite,
      files: components.map((component) => ({
        name: `${component.name}.tsx`,
        content: component.content,
      })),
    });

    if (!componentsAlreadyCreated.length) return null;

    return componentsAlreadyCreated;
  };

  private installDependencies = async (dependencies: string[]) => {
    await installDependencies(dependencies, this.config.resolvedPaths.cwd);
  };

  /**
   * Installs selected components and their dependencies
   */
  public installComponents = async (componentList: string[]) => {
    let indices!: ComponentsIndices;
    await p.tasks([
      {
        title: 'Fetching components info',
        task: async () => {
          indices = await this.fetchComponentIndices();
          return 'Fetched components info';
        },
      },
    ]);
    const rawComponentsToInstall = this.options.all
      ? indices.map(({ name }) => name)
      : componentList.length
        ? componentList
        : await this.promptForComponentSelection(indices);
    const componentsToInstall = this.options.all
      ? rawComponentsToInstall
      : indices
          .filter(({ name }) => rawComponentsToInstall.includes(name))
          .flatMap(({ name, required }) => [name, ...(required ?? [])]);

    const components = await this.fetchComponentsJson(componentsToInstall);
    const transformedComponents = await this.tansformComponents(components);
    const dependencies = this.extractDependencies(components);

    if (!this.options.yes && !(await this.confirmInstallation()))
      return this.handleCancellation();

    await p.tasks([
      {
        title: 'Writing components',
        task: async () => {
          const componentsAlreadyCreated = await this.writeComponentFiles(
            transformedComponents,
          );
          if (components.length === componentsAlreadyCreated?.length)
            return `No components were written. All components already existed and weren't overwritten.`;
          if (componentsAlreadyCreated)
            return `Components written. The component(s) ${componentsAlreadyCreated.join(', ')} already existed and weren't overwritten.`;

          return 'Components written';
        },
      },
      {
        title: 'Installing dependencies',
        task: async () => {
          await this.installDependencies(dependencies);
          return 'Dependencies installed';
        },
      },
    ]);
  };
}
