import {
  BoxIcon,
  CircleHelpIcon,
  DollarSignIcon,
  FlagIcon,
  FolderIcon,
  FootprintsIcon,
  MailIcon,
  WorkflowIcon,
} from 'lucide-react';

import { Card, CardDescription, CardHeader, CardTitle } from '@kosori/ui/card';

const cards = [
  {
    icon: FlagIcon,
    title: 'Kõsori',
    description: 'What is Kõsori and what can it do for you?',
  },
  {
    icon: WorkflowIcon,
    title: 'Workflow',
    description: 'How does Kõsori work and what are its features?',
  },
  {
    icon: CircleHelpIcon,
    title: 'Support',
    description: 'Why this is not working for me? How can I get help?',
  },
  {
    icon: FolderIcon,
    title: 'Branding',
    description: 'Kõsori branding guidelines, assets and more.',
  },
  {
    icon: FootprintsIcon,
    title: 'Install Guide',
    description: 'Step-by-step guide to install and configure Kõsori.',
  },
  {
    icon: BoxIcon,
    title: 'Features',
    description: 'List of all the features and benefits of Kõsori.',
  },
  {
    icon: DollarSignIcon,
    title: 'Pricing',
    description: 'Discover pricing plans and packages with different features.',
  },
  {
    icon: MailIcon,
    title: 'Contact',
    description: 'You can contact us for support or more information.',
  },
];

export const Cards = () => {
  return (
    <>
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader>
            <div className='mb-2 w-fit rounded-md border p-2'>
              <card.icon className='size-4' />
            </div>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
  );
};
