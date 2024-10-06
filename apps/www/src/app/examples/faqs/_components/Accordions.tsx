import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@kosori/ui/accordion';

const accordions = [
  {
    id: 'free-trial',
    title: 'Is there a free trial?',
    content:
      'Yes, there is a free trial available. You can try it out for 30 days for free. After that, you will need to pay for the full version.',
  },
  {
    id: 'platforms',
    title: 'What platforms does support?',
    content:
      'Kõsori is available on Windows, macOS and Linux, as well as mobile applications for iOS and Android.',
  },
  {
    id: 'cancel-subscription',
    title: 'How do I cancel my subscription?',
    content:
      'You can cancel your subscription at any time by going to your account settings and selecting "Cancel subscription".',
  },
  {
    id: 'payment-methods',
    title: 'What payment methods do you accept?',
    content: 'We accept all major credit cards, PayPal, and bank transfers.',
  },
  {
    id: 'data-safe',
    title: 'Is my data safe?',
    content:
      'Yew, we take your privacy seriously. We use encryption and follow best practices to ensure your data is protected.',
  },
  {
    id: 'upgrade-downgrade',
    title: 'Can I upgrade or downgrade my plan?',
    content:
      'Yes, you can upgrade or downgrade your plan at any time through your account settings.',
  },
  {
    id: 'refund',
    title: 'Can I get a refund?',
    content: 'Yes, you can request a refund from your account settings.',
  },
  {
    id: 'cancel-account',
    title: 'Can I cancel my account?',
    content:
      'Yes, you can cancel your account at any time by going to your account settings and selecting "Cancel account".',
  },
  {
    id: 'delete-data',
    title: 'What happens to may data if I cancel?',
    content:
      'If you cancel your subscription, you will retain access to your data for 30 days. After that, your data will be deleted from our servers.',
  },
];

export const Accordions = () => {
  return (
    <Accordion collapsible className='grid gap-4' type='single'>
      {accordions.map((accordion) => (
        <AccordionItem key={accordion.id} value={accordion.id}>
          <AccordionTrigger>{accordion.title}</AccordionTrigger>
          <AccordionContent>
            <p>{accordion.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
