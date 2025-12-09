# Custom Domain Setup for Wild Bean Coffee

This guide walks you through setting up `www.wildBeanCoffee.com` (and optionally `wildBeanCoffee.com`) with Vercel.

## Prerequisites

- Domain purchased (if not already owned)
- Vercel account with deployed project
- Access to domain registrar DNS settings

## Step-by-Step Setup

### Step 1: Add Domain in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **Wild Bean Coffee** project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `www.wildBeanCoffee.com`
6. Click **Add**

### Step 2: Configure DNS Records

Vercel will show you the exact DNS records to add. Here's what you'll typically need:

#### For www.wildBeanCoffee.com (CNAME)
In your domain registrar's DNS settings, add:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

#### For wildBeanCoffee.com (Root Domain - Optional)
If you want the root domain to work too:

**Option A: A Record**
```
Type: A
Name: @ (or blank, depending on registrar)
Value: 76.76.21.21 (check Vercel dashboard for current IP)
TTL: 3600
```

**Option B: CNAME (if your registrar supports it)**
Some registrars allow CNAME for root domain:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

**Note**: Vercel dashboard shows the exact values - use those!

### Step 3: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Usually completes in 10-30 minutes
- Check status in Vercel dashboard (will show "Valid Configuration" when ready)

### Step 4: SSL Certificate

- Vercel automatically provisions SSL certificates
- Takes a few minutes after DNS is verified
- You'll see a green checkmark in Vercel dashboard when SSL is active
- Your site will be accessible via HTTPS automatically

### Step 5: Update Backend CORS

After your domain is live, update Railway backend:

1. Go to Railway dashboard → Your backend service → Variables
2. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://www.wildBeanCoffee.com,https://wildBeanCoffee.com
   ```
3. Railway will automatically restart

**Important**: 
- Include both `www` and non-`www` versions
- Use `https://` (not `http://`)
- No trailing slashes

### Step 6: Test Your Domain

1. Visit `https://www.wildBeanCoffee.com`
2. Verify:
   - ✅ Site loads correctly
   - ✅ Browser shows secure padlock (SSL working)
   - ✅ No console errors
   - ✅ API calls work (check Network tab in DevTools)
   - ✅ No CORS errors

### Step 7: Redirect Root Domain (Optional)

If you want `wildBeanCoffee.com` to automatically redirect to `www.wildBeanCoffee.com`:

1. Add `wildBeanCoffee.com` as a domain in Vercel (Settings → Domains)
2. Vercel will automatically redirect to www version
3. Or configure redirect in your domain registrar's settings

## Common Domain Registrars

### Namecheap
1. Go to Domain List → Manage → Advanced DNS
2. Add CNAME record: `www` → `cname.vercel-dns.com`
3. Save changes

### Google Domains
1. Go to DNS → Custom records
2. Add CNAME: `www` → `cname.vercel-dns.com`
3. Save

### GoDaddy
1. Go to DNS Management
2. Add CNAME record: `www` → `cname.vercel-dns.com`
3. Save

### Cloudflare
1. Go to DNS → Records
2. Add CNAME: `www` → `cname.vercel-dns.com`
3. Proxy status: DNS only (gray cloud) or Proxied (orange cloud)
4. Save

## Troubleshooting

### Domain Not Resolving
- Wait longer (DNS can take up to 48 hours)
- Check DNS records are correct
- Use `dig www.wildBeanCoffee.com` or `nslookup www.wildBeanCoffee.com` to verify
- Clear browser cache

### SSL Certificate Not Issued
- Wait a few minutes after DNS is verified
- Check Vercel dashboard for SSL status
- Ensure DNS is fully propagated

### CORS Errors After Adding Domain
- Update `CORS_ORIGIN` in Railway with your new domain
- Include both `www` and non-`www` versions
- Use `https://` protocol
- Restart backend if needed

### Mixed Content Warnings
- Ensure all API calls use HTTPS
- Check `NEXT_PUBLIC_API_URL` uses `https://`
- Update any hardcoded HTTP URLs

## Domain Best Practices

1. **Always use HTTPS** - Vercel provides this automatically
2. **Include both www and non-www** in CORS_ORIGIN
3. **Set up redirects** - Redirect root to www (or vice versa) for consistency
4. **Monitor DNS** - Use tools like [dnschecker.org](https://dnschecker.org) to verify propagation
5. **Keep DNS simple** - Use CNAME for www, A record for root if needed

## Cost

- **Vercel**: Custom domains are **free** (included in all plans)
- **SSL Certificate**: **Free** (automatic via Let's Encrypt)
- **Domain**: $10-15/year (if you need to purchase)

## Summary

After setup:
- ✅ `www.wildBeanCoffee.com` → Your Vercel site
- ✅ `wildBeanCoffee.com` → Redirects to www (if configured)
- ✅ HTTPS/SSL → Automatic
- ✅ Backend CORS → Updated to allow your domain

Your site is now live at your custom domain! 🎉

