// src/components/ContactForm.tsx
'use client';
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  CircularProgress,
    Box
} from '@mui/material';
import { z } from 'zod';

// Define the Zod schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({}); // Store Zod errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    // Clear the error for this field when it changes
    if (errors[event.target.name as keyof ContactFormData]) {
      setErrors({
        ...errors,
        [event.target.name]: undefined,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Validate the form data with Zod
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      // Convert Zod errors to a usable format
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || `Failed to submit form: ${response.status}`;
        throw new Error(errorMessage);
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({}); // Clear errors
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
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Contact Us
      </Typography>
      {submitSuccess && (
        <Typography color="success" align="center">
          Message sent successfully!
        </Typography>
      )}
      {submitError && (
        <Typography color="error" align="center">
          Error: {submitError}
        </Typography>
      )}
      <form onSubmit={handleSubmit} noValidate>
        {/* Use Stack instead of Grid */}
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
          {/* Use Box for centering the button */}
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
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