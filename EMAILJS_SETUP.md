# EmailJS Setup Instructions

The contact form is now configured to send emails directly to `pouchex@corbettlabs.in` using EmailJS.

## Setup Steps:

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account (200 emails/month free)

2. **Add Email Service**
   - Go to "Email Services" in your EmailJS dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Note your **Service ID**

3. **Create Email Template**
   - Go to "Email Templates" in your EmailJS dashboard
   - Click "Create New Template"
   - Use this template structure:
   
   ```
   Subject: {{subject}}
   
   {{message}}
   ```
   
   Or use individual fields:
   ```
   Subject: {{subject}}
   
   Full Name: {{full_name}}
   Email: {{email}}
   Company: {{company_name}}
   Role: {{role}}
   Product Interest: {{product_interest}}
   Expected Volume: {{expected_volume}}
   Project Details: {{project_details}}
   Submission Date: {{submission_date}}
   ```
   
   - Set "To Email" to: `pouchex@corbettlabs.in`
   - Note your **Template ID**

4. **Get Public Key**
   - Go to "Account" → "General" in EmailJS dashboard
   - Copy your **Public Key**

5. **Configure Environment Variables**
   - Create a `.env` file in the root of your project
   - Add the following:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

6. **Restart Development Server**
   - Stop your dev server (Ctrl+C)
   - Run `npm run dev` again

## Email Format

The emails will be sent in a structured format with:
- Contact Information (Name, Email, Company, Role)
- Project Details (Product Interest, Expected Volume, Project Details)
- Submission timestamp

All emails will be sent to: **pouchex@corbettlabs.in**
