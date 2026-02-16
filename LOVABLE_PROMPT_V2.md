# Lovable Prompt — V2 Changes (Dashboard, Admin, Login, Mobile Numbers)

Copy everything below the line and paste it into Lovable as a single prompt.

---

## ⚠️ IMPORTANT — DO NOT TOUCH THESE:
- **The Number Plate Generator / Plate Card flip animation**: The existing plate rendering engine (`PlateGenerator.tsx`, `PlateCard.tsx`, `plate-generator.js`) and the card flip effect on the homepage **must remain exactly as they are**. Do NOT modify, refactor, or simplify any plate rendering logic, canvas drawing, or card animations. They are pixel-perfect and carefully tuned.

---

## 1. 🔐 LOGIN PAGE — Phone Number Input with Country Code & Validation

**File:** `LoginPage.tsx`

Currently, the login page only has Email + Password fields. I want you to **add a "Login with Phone Number" option** as well (or at minimum, allow login by phone number in addition to email). Here's exactly what I need:

### Requirements:
1. **Country Code Selector**: Add a dropdown/button before the phone number input that defaults to **+971 (UAE)**. The user should be able to tap it to change to other country codes (show a small list of common ones: +971 UAE, +966 Saudi, +968 Oman, +973 Bahrain, +974 Qatar, +965 Kuwait, +44 UK, +1 US, +91 India, +92 Pakistan).
2. **UAE Flag Icon**: Show a small UAE flag emoji or icon (🇦🇪) next to the default +971 code.
3. **Phone Number Validation**:
   - For UAE numbers (+971): Must be exactly **9 digits** after the country code (e.g., `50 123 4567`). The number must start with `50`, `52`, `54`, `55`, `56`, or `58`.
   - Show a red inline error message if the format is invalid (e.g., "Please enter a valid UAE mobile number").
   - Auto-format the number as the user types (e.g., `50 123 4567`).
4. **Toggle between Email and Phone login**: Add a small text link or toggle below the form that says "Login with Phone Number" / "Login with Email" so the user can switch.
5. **Password Validation**: Add minimum requirements hint — "Password must be at least 6 characters" shown as a subtle helper text below the password field.
6. **"Remember Me" Checkbox**: Optional but nice to have.

### Also fix on `SignupPage.tsx`:
- The phone number field on signup should also have the **+971 country code prefix** and the **same validation rules** described above.
- After signup, make sure the phone number (with country code) is saved to the `profiles` table in the `phone_number` column.

---

## 2. 📊 DASHBOARD PAGE — Complete Redesign for Bulk Entry

**File:** `DashboardPage.tsx`

The current dashboard only lets users add **one plate at a time** using a simple form. I want to redesign it so users can add **10–15 numbers at once** using a dynamic row-based form. Here's exactly what I need:

### Requirements:

1. **Dynamic Multi-Row Form**: Instead of the single "Add Listing" form, show a table/list of editable rows. Each row has these fields **inline**:
   - **Plate Number** (text input, required)
   - **Emirate** (dropdown: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah)
   - **Plate Style / Code** (text input, e.g., "A", "AA", "P", etc.)
   - **Price (AED)** (number input)
   - **Description** (text input — short one-liner)
   - **Contact Email** (text input — auto-fill with user's email)
   - **Contact Phone** (text input — auto-fill with user's phone from profile)
   - **Delete Row** button (🗑️ icon) to remove that row

2. **"+ Add Another" Button**: A prominent button below the rows that adds a new empty row. Start with **1 row** visible by default. User can keep clicking "+" to add more rows (up to 20 max).

3. **"Save All" Button**: A single button at the bottom that submits **all rows at once** in a batch insert to the `listings` table in Supabase. Show a loading spinner during save and a success toast with the count (e.g., "12 listings created successfully!").

4. **Auto-Fill Smart Defaults**: When adding a new row, auto-fill:
   - Emirate → same as the previous row (so if user is adding 10 Dubai plates, they only set it once)
   - Contact Email → from `user.email`
   - Contact Phone → from `profile.phone_number`

5. **Listing Table Below**: Keep the existing listing table below the form, but make it look more polished:
   - Add a **search/filter bar** at the top to search by plate number
   - Add **filter buttons** for status (All, Active, Sold, Hidden)
   - Show the **plate number in a styled plate badge** (not just plain text)
   - Add **pagination** if there are more than 20 listings (or "Load More" button)

6. **Profile Card**: The profile section at the top is fine, but add the user's **email** more prominently and show a small badge if the user is an admin.

---

## 3. 👑 ADMIN PANEL — Track Who Added What

**File:** `AdminPage.tsx`

The admin panel currently shows listings but does NOT show **who submitted each listing**. I need to know which user added which plate number.

### Requirements:

1. **User Reference on Every Listing**: In the "All Listings" tab, each listing row should show:
   - Plate Number
   - Emirate
   - Price
   - Status
   - **Added By** → Show the **user's email** (or phone number, or full name) fetched from the `profiles` table by joining on `user_id`.
   - **Date Added** → Show the `created_at` timestamp in a readable format (e.g., "14 Feb 2026")

2. **Expandable User Detail**: When you click on a user's name/email in the listing, optionally show a small popup or expand section showing:
   - User's full name
   - User's email
   - User's phone number
   - Total listings by this user
   - Date user joined

3. **Search & Filter in Admin Listings**:
   - Search bar that searches by plate number OR by user email/name
   - Filter dropdown by Emirate
   - Filter by Status (active, sold, hidden)
   - Sort by: Date Added (newest first), Price (high to low), etc.

4. **Users Tab Enhancement**: The "Users" tab currently only shows name and phone. Improve it to show:
   - Full Name
   - Email (fetched from Supabase Auth or stored in profiles)
   - Phone Number
   - **Number of Listings** this user has
   - **Join Date**
   - A **"View Listings"** button that filters the listings tab to show only that user's listings

5. **Analytics Tab Enhancement**: Add more stats:
   - **Listings by Emirate** (mini bar chart or just numbers)
   - **Most Active Users** (top 5 users by listing count)
   - **Recent Activity** feed (last 10 actions — "User X added plate Y")

6. **Bulk Upload Enhancement**: The current bulk upload only lets you paste plate numbers with one shared emirate/price. Enhance it to allow:
   - Per-row fields: plate_number, emirate, price, plate_style (comma-separated in text mode)
   - CSV format: `plate_number,emirate,price,plate_style`
   - Show a **preview table** of what will be imported before confirming

---

## 4. 📱 MOBILE NUMBERS SECTION — Du & Etisalat Logos

**File:** `MobileNumbers.tsx`

Currently the carrier name ("Du", "Etisalat") is shown as a plain text badge. Replace it with the **actual carrier logos**.

### Requirements:
1. **Etisalat Logo**: Use the official Etisalat (now "e&") logo. Place the image file at `/public/etisalat-logo.png`. Show it as a small icon (about 40px × 20px) in the card where the carrier badge currently is.
2. **Du Logo**: Use the official Du logo. Place the image file at `/public/du-logo.png`. Show it as a small icon (about 40px × 20px) in the card.
3. **Keep the color coding**: Etisalat cards should still have the green accent, Du cards should still have the blue accent. Just replace the text badge with the logo image.
4. If the logo images are not available, generate placeholder badges that say "e&" and "du" in their respective brand colors (Etisalat green #00a651, Du blue #003b71) with a modern rounded pill shape.

---

## 5. 🗄️ DATABASE / SUPABASE SCHEMA CHECK

Please confirm or add these columns to the **`listings`** table:
- `user_id` (uuid, references auth.users) — **already exists**, just confirm
- `contact_email` (text, nullable) — for the contact email field
- `contact_phone` (text, nullable) — for the contact phone field

And in the **`profiles`** table, confirm:
- `id` (uuid, references auth.users)
- `full_name` (text)
- `phone_number` (text)
- `email` (text) — Add this column if it doesn't exist, so the admin panel can easily query user emails without needing to call Supabase Auth API separately. Auto-populate from auth on signup.

---

## Summary Checklist:
- [ ] **DO NOT** change plate generator, plate card, or flip animations
- [ ] Login page: Add phone login with +971 country code selector and validation
- [ ] Signup page: Add +971 country code to phone field with validation
- [ ] Dashboard: Redesign to multi-row bulk entry with "+" button (10-15 at once)
- [ ] Dashboard: Better listing table with search, filter, and styled plate badges
- [ ] Admin: Show "Added By" (email/phone/name) for every listing
- [ ] Admin: Enhanced Users tab with listing count and "View Listings" button
- [ ] Admin: Better analytics with per-emirate stats and most active users
- [ ] Admin: Improved bulk upload with per-row fields and preview
- [ ] Mobile Numbers: Replace carrier text badges with Du and Etisalat logos
- [ ] Database: Add `contact_email`, `contact_phone` to listings; add `email` to profiles

