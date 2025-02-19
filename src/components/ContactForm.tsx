// src/components/ContactForm.tsx
'use client';
import React, { useState, useCallback } from 'react';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  CircularProgress,
  Box,
  Alert,
  Collapse,
} from '@mui/material';
import { z } from 'zod';
import { useTheme } from '@mui/material/styles';

// Define the Zod schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function ContactForm() {
  const theme = useTheme();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = useCallback((event: React.ChangeEvent< HTMLInputElement | HTMLTextAreaElement >) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: undefined,
    }));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Partial<ContactFormData> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as keyof ContactFormData] = issue.message;
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `Failed to submit form: ${response.status}`;
        throw new Error(errorMessage);
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 700, mb: 3 }}>
        Contact Us
      </Typography>

      <Collapse in={submitSuccess}>
        <Alert severity="success" onClose={() => setSubmitSuccess(false)} sx={{ mb: 2 }}>
          Message sent successfully!
        </Alert>
      </Collapse>
      <Collapse in={!!submitError}>
        <Alert severity="error" onClose={() => setSubmitError(null)} sx={{ mb: 2 }}>
          Error: {submitError}
        </Alert>
      </Collapse>

      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
            aria-describedby="name-error"
          />
          <TextField
            fullWidth
            label="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
            aria-describedby="email-error"
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            multiline
            rows={4}
            variant="outlined"
            error={!!errors.message}
            helperText={errors.message}
            aria-describedby="message-error"
          />
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 1,
                boxShadow: theme.shadows[2],
                '&:hover': {
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </Button>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}

export default ContactForm;