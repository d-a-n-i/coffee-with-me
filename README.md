# Coffee With Me — סיורי קפה עם דיקלה דנינו

אתר תדמית בעברית (עמוד אחד, סטטי) לסיורי הקפה של דיקלה דנינו — מתפרסם ב-GitHub Pages תחת `diklacoffeeguide.com`.

- אינסטגרם: https://www.instagram.com/_coffee_with_me__/
- טלפון / וואטסאפ: 052-357-3404

## מבנה

| קובץ | תפקיד |
| --- | --- |
| `index.html` | העמוד כולו, כולל Open Graph, JSON-LD (`LocalBusiness`, `Person`, `TouristTrip`, `FAQPage`) ו-FAQ |
| `styles.css` | עיצוב, כולל `@font-face` לפונטים המקומיים ומצבי מובייל/דסקטופ |
| `script.js` | תפריט מובייל, פס CTA דביק, קרוסלת המלצות, חשיפת גלריה ואירועי אנליטיקס |
| `assets/fonts/` | Heebo ו-Secular One (תת-קבוצות עברית + לטינית, woff2) — מוגשים מהאתר ולא מ-Google Fonts |
| `assets/web/` | תמונות מקור (JPG) וגרסאות WebP ב-800px ו-1400px שהעמוד משתמש בהן; `og-cover.jpg` לתצוגה מקדימה בשיתוף |
| `llms.txt`, `sitemap.xml`, `robots.txt`, `site.webmanifest` | קבצי SEO/GEO |
| `scripts/make-images.sh` | יוצר מחדש את קובצי ה-WebP מתמונות המקור (דורש ImageMagick) |

## עריכת תוכן

- **שאלות נפוצות**: כל שאלה מופיעה פעמיים — ב-HTML (`<details class="faq-item">`) וב-JSON-LD (`FAQPage`). יש לעדכן את שתיהן.
- **המלצות**: הכרטיסים ב-`#voices` הם טקסט; צילומי המסך המקוריים (`fb*.jpg`) מוצגים בפס קטן מתחתיהם כהוכחה.
- **הודעות וואטסאפ מוכנות**: כל כפתור וואטסאפ מקודד הודעה פותחת (לדוגמה "מתעניינים בסיור קפה לגיבוש צוות"). לשינוי, קודדו את הטקסט עם `encodeURIComponent` והחליפו ב-`href`.
- **תמונות חדשות**: הוסיפו JPG ל-`assets/web/`, הריצו `bash scripts/make-images.sh`, והפנו ב-HTML ל-`-800.webp`/`-1400.webp` עם `srcset`.

## אנליטיקס

Google Analytics (`G-8YZW8GR5KW`) מקבל אירוע `contact_click` על כל לחיצה על טלפון, וואטסאפ, SMS או אינסטגרם, עם הפרמטרים `method` (`call` / `whatsapp` / `sms` / `instagram`), `placement` (`hero`, `sticky`, `contact`, `audiences` וכו') ו-`link_text`. כדאי לסמן את `contact_click` כ-Key event ב-GA4 כדי למדוד פניות.

## פרסום

האתר מתפרסם בנפרד מ-d85c.com. דחיפה ל-`main` מפרסמת ל-GitHub Pages (`CNAME` + `.nojekyll`).
