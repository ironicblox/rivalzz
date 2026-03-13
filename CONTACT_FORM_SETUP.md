# Contact Form Setup Instructions

Your contact form is now configured to send real emails using Web3Forms (free service).

## Setup Steps:

### 1. Get Your Free Access Key

1. Go to https://web3forms.com
2. Click "Get Started" or "Create Access Key"
3. Enter your email address (where you want to receive contact form submissions)
4. Click "Create Access Key"
5. Copy the access key they provide

### 2. Add Your Access Key to the Website

1. Open `index.html`
2. Find this line (around line 845):
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key from Web3Forms
4. Save the file

### 3. Test Your Contact Form

1. Open your website
2. Fill out the contact form
3. Click "Send Message"
4. Check your email inbox (the one you registered with Web3Forms)
5. You should receive the contact form submission!

## Features:

✅ **Free Forever** - Web3Forms is completely free
✅ **No Backend Required** - Works with static websites
✅ **Spam Protection** - Built-in captcha protection
✅ **Email Notifications** - Get instant email notifications
✅ **Custom Subject** - Emails have "New Contact Form Submission from Portfolio" subject
✅ **Professional** - Clean email format with all form data

## Alternative: Use Your Own Email Service

If you prefer to use a different service, here are some alternatives:

1. **Formspree** - https://formspree.io (free tier available)
2. **EmailJS** - https://www.emailjs.com (free tier available)
3. **Netlify Forms** - If hosting on Netlify (free)
4. **Getform** - https://getform.io (free tier available)

## Troubleshooting:

**Not receiving emails?**
- Check your spam folder
- Verify you entered the correct access key
- Make sure you verified your email with Web3Forms
- Check the browser console for any errors

**Form not submitting?**
- Check browser console for errors
- Make sure you have internet connection
- Verify the access key is correct

## Support:

If you need help, contact Web3Forms support at: https://web3forms.com/support
