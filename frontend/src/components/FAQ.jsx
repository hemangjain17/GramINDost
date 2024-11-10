import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'How do I set up Sapplinns on my farm?',
    answer:
      'Sapplinns installation is straightforward, with plug-and-play sensors and a user-friendly app. Follow the app instructions to position sensors and sync them with your mobile device.',
  },
  {
    question: 'How often should I use Sapplinns for soil testing?',
    answer:
      'Sapplinns performs continuous monitoring, so you receive updates as often as you’d like. You can customize notifications for daily, weekly, or monthly summaries.',
  },
  {
    question: 'Can Sapplinns guide me on crop rotation?',
    answer:
      'Yes! Sapplinns crop rotation planner offers tailored suggestions, helping maintain soil health and prevent pest cycles in the long run.',
  },
  {
    question: 'Is Sapplinns compatible with organic farming practices?',
    answer:
      'Absolutely! Sapplinns supports sustainable agriculture, with features designed to assist organic farmers in maintaining soil quality and optimizing crop production naturally.',
  },
  {
    question: 'Does Sapplinns work on different soil types?',
    answer:
      'Yes! Sapplinns adapts to diverse soil conditions, making it versatile and effective across different climates and soil compositions.',
  },
];

export default function FAQ() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        FAQs on Using Sapplinns
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
                backgroundColor: '#28a745', // Updated to a green shade
                color: 'white',
                borderRadius: '4px',
            }}
            >
            <Typography sx={{ fontWeight: 'medium' }}>{faq.question}</Typography>
            </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
