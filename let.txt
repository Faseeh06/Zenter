🔹 1. Add Video role restriction
Right now any logged-in user can add videos.
Readme says admin/internee only.
We can add a role check on /dashboard/videos/new.

🔹 2. Forgot Password flow
Replace placeholder link in login with supabase.auth.resetPasswordForEmail(...) + confirmation page.

🔹 3. Landing page links
Navbar links still point to #features / #showcase / #apply.
For production, link to real routes:

/dashboard/videos
/showcase
/dashboard/internee or /login

🔹 4. Delete account
“Danger Zone” button in settings is still placeholder.
Optional: implement real delete (soft delete or full delete user).

🔹 5. Email confirmation UX
If Supabase confirmation is enabled, show a “check your email” screen after signup.


Admin panel separate that Can have look on all admin pages, can access users, see who has applied for internship and who hasn't 
For a basic intern, they can only add their projects and view the videos etc, they can't add the videos. Only admin should be able to add the video clips.

