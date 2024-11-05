type Props = {
  type: 'example' | 'template';
  name: string;
  description: string;
};

export const PagePreview = ({ type, name, description }: Props) => {
  return (
    <figure>
      <div className='relative aspect-[4/2.5] w-full overflow-hidden rounded-xl border'>
        <div className='absolute inset-0 w-[1600px] bg-grey-base'>
          <iframe className='size-full' src={`/${type}s/${name}`} />
        </div>
      </div>

      <figcaption>{description}</figcaption>
    </figure>
  );
};
