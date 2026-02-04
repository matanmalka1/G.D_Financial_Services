# TODO: Financial News & Articles Refactor

## Overview

Separate static internal articles from dynamic external financial news. Add a region-aware and language-aware financial news page powered by GNews API. Refactor navbar navigation to use a Select dropdown instead of a single link.

**Core Principle**: Zero regressions in existing Articles functionality.

---

## A. Preparation / Setup

### A1. Environment Variable Configuration

**File**: `.env` (create if doesn't exist at project root)

**Action**: Add the following environment variable:

```
VITE_GNEWS_API_KEY=your_api_key_here
```

**Why**: GNews API requires an API key for authentication. Using Vite's `import.meta.env` pattern ensures the key is available at build time.

**Missing Key Behavior**:

- If `VITE_GNEWS_API_KEY` is not set or empty:
  - API service returns a graceful error object
  - Financial News page displays `ErrorState` component with message: "API key not configured. Please add VITE_GNEWS_API_KEY to your environment."
  - No crash, no console spam
  - User can still navigate to Articles page normally

**Developer Note**: `.env` should be in `.gitignore`. Provide `.env.example` for team reference.

---

## B. Translations

### B1. Extend Global Translations

**File**: `src/i18n/locales/global.json`

**Action**: Add new navigation labels to the `nav` object:

```json
{
  "en": {
    "nav": {
      "financialNews": "Financial News",
      "articles": "Articles"
      // ...existing keys remain
    }
  },
  "he": {
    "nav": {
      "financialNews": "חדשות פיננסיות",
      "articles": "מאמרים"
      // ...existing keys remain
    }
  }
}
```

**Why**: The navbar Select needs localized labels for both dropdown options. Keeping these in `global.json` alongside existing `nav` keys maintains consistency with the current translation structure.

---

### B2. Create Financial News Translations

**File**: `src/i18n/locales/financialNews.json` (new file)

**Action**: Create a dedicated translation file for the Financial News page:

```json
{
  "en": {
    "title": "Financial News",
    "regionSelector": {
      "label": "Region",
      "global": "Global Financial News",
      "israel": "Local Financial News - Israel"
    },
    "loading": "Loading financial news...",
    "error": {
      "title": "Failed to load news",
      "apiKeyMissing": "API key not configured. Please add VITE_GNEWS_API_KEY to your environment.",
      "fetchFailed": "Unable to fetch news. Please try again later.",
      "retry": "Retry"
    },
    "empty": {
      "title": "No news available",
      "description": "There are no articles available for this region at the moment."
    },
    "card": {
      "source": "Source",
      "readMore": "Read on source site",
      "openInNewTab": "Opens in new tab"
    }
  },
  "he": {
    "title": "חדשות פיננסיות",
    "regionSelector": {
      "label": "אזור",
      "global": "חדשות פיננסיות גלובליות",
      "israel": "חדשות פיננסיות מקומיות - ישראל"
    },
    "loading": "טוען חדשות פיננסיות...",
    "error": {
      "title": "טעינת החדשות נכשלה",
      "apiKeyMissing": "מפתח API לא מוגדר. אנא הוסף VITE_GNEWS_API_KEY לסביבה שלך.",
      "fetchFailed": "לא ניתן לטעון חדשות. אנא נסה שוב מאוחר יותר.",
      "retry": "נסה שוב"
    },
    "empty": {
      "title": "אין חדשות זמינות",
      "description": "אין מאמרים זמינים לאזור זה כרגע."
    },
    "card": {
      "source": "מקור",
      "readMore": "קרא באתר המקור",
      "openInNewTab": "נפתח בכרטיסייה חדשה"
    }
  }
}
```

**Why**:

- Separation of concerns: News-specific strings don't clutter `global.json`
- Easier maintenance: All news-related translations in one place
- Follows existing pattern: Other pages (home, contact, news) have dedicated translation files

---

### B3. Import Financial News Translations

**File**: `src/i18n/translations.js`

**Action**: Import and merge the new translation file:

```javascript
import financialNews from "./locales/financialNews.json";

// In the mergeTranslations function, add:
const translations = {
  en: {
    // ...existing
    financialNews: financialNews.en,
  },
  he: {
    // ...existing
    financialNews: financialNews.he,
  },
};
```

**Why**: The `useLanguage()` hook needs access to these translations via `t.financialNews.*`.

---

## C. Routing

### C1. Add Financial News Route Path

**File**: `src/routes/paths.js`

**Action**: Add the new route to both `routePaths` and `routes` objects:

```javascript
export const routePaths = {
  // ...existing paths
  financialNews: "/financial-news",
};

export const routes = {
  // ...existing helpers
  financialNews: () => routePaths.financialNews,
};
```

**Why**:

- Maintains consistency with existing routing pattern
- `routePaths` provides string constants for route matching
- `routes` provides helper functions for programmatic navigation
- Centralized route definitions prevent typos and enable easy refactoring

---

### C2. Register Financial News Route

**File**: `src/App.jsx`

**Action**: Import the `FinancialNews` component and add the route:

```javascript
import { FinancialNews } from "./pages/FinancialNews";

// In the Routes component:
<Route path={routePaths.financialNews} element={<FinancialNews />} />;
```

**Why**: React Router requires explicit route registration. The Financial News page needs to be accessible at `/financial-news`.

**Note**: No ErrorBoundary wrapping required for this page per requirements (handle errors internally).

---

## D. Navbar Refactor

### D1. Refactor Desktop Navigation

**File**: `src/components/layout/navbar/NavbarDesktopNav.jsx`

**Current State**: Has a `NavLink` component pointing to `routePaths.news`

**Action**: Replace the news `NavLink` with a `Select` component:

**Before**:

```jsx
<NavLink to={routePaths.news} ...>
  {t.nav.news}
</NavLink>
```

**After**:

```jsx
<Select
  placeholder={t.nav.news}
  options={[
    { value: "/financial-news", label: t.nav.financialNews },
    { value: "/news", label: t.nav.articles },
  ]}
  onValueChange={(path) => navigate(path)}
  dir={isRtl ? "rtl" : "ltr"}
  className="min-w-[160px]"
/>
```

**Why**:

- Replaces single link with dropdown containing two options
- Uses existing `Select` component (no new dependencies)
- Maintains RTL support via `dir` prop
- Navigation handled via `onValueChange` callback
- Placeholder shows generic "News & Articles" label when nothing selected

**Props Required**:

- Add `navigate` from `useNavigate()` hook (already imported in parent `Navbar.jsx`, pass down as prop)
- `t` and `isRtl` already available as props

---

### D2. Refactor Mobile Navigation

**File**: `src/components/layout/navbar/NavbarMobileMenu.jsx`

**Current State**: Has a `NavLink` component for news

**Action**: Replace with mobile-friendly selection (two separate links):

**Before**:

```jsx
<NavLink to={routePaths.news} onClick={onClose} ...>
  {t.nav.news}
</NavLink>
```

**After**:

```jsx
<div className="flex flex-col space-y-2 py-2 border-y border-gray-50">
  <button
    onClick={() => {
      navigate("/financial-news");
      onClose();
    }}
    className="block w-full text-left rtl:text-right py-2 text-slate-700 pl-4 rtl:pr-4"
  >
    {t.nav.financialNews}
  </button>
  <button
    onClick={() => {
      navigate("/news");
      onClose();
    }}
    className="block w-full text-left rtl:text-right py-2 text-slate-700 pl-4 rtl:pr-4"
  >
    {t.nav.articles}
  </button>
</div>
```

**Why**:

- Mobile UX: Separate tappable buttons work better than a nested dropdown on mobile
- Follows existing mobile pattern (see sector submenu rendering)
- Visual grouping via border-y distinguishes the news section
- `onClose()` ensures menu closes after navigation
- Consistent styling with existing sector submenu buttons

**Props Required**:

- Add `navigate` prop (pass from parent `Navbar.jsx`)

---

### D3. Update Navbar Component

**File**: `src/components/layout/Navbar.jsx`

**Action**: Pass `navigate` function to child components:

```jsx
const navigate = useNavigate(); // Already exists

<NavbarDesktopNav
  // ...existing props
  navigate={navigate}
/>

<NavbarMobileMenu
  // ...existing props
  navigate={navigate}
/>
```

**Why**: Child components need access to `navigate` for the new Select/button navigation behavior.

---

## E. News API Service

### E1. Create News API Service

**File**: `src/services/newsApiService.js` (new file)

**Purpose**: Centralize all GNews API interaction logic with session-level caching and rate-limit safety.

**Required Exports**:

```javascript
// Session-level cache: Map<string, CachedData>
// Key format: `${language}-${region}`
// Value: { newsItems: Array, timestamp: number, hasMore: boolean }

export const newsApiService = {
  fetchFinancialNews: async (language, region, page = 1) => { ... },
  clearCache: () => { ... },
  getCacheKey: (language, region) => { ... }
};
```

**Key Implementation Details**:

1. **Cache Structure**:

   ```javascript
   const newsCache = new Map();
   // Key: "en-global", "he-israel"
   // Value: {
   //   newsItems: [...],  // Array of news objects
   //   hasMore: boolean,  // Can fetch more?
   //   lastPage: number   // Last fetched page
   // }
   ```

2. **Fetch Logic**:
   - Check cache first: If `${language}-${region}` exists and has data for requested page range, return from cache
   - If cache miss or need more data:
     - Build GNews API URL: `https://gnews.io/api/v4/search?`
     - Parameters:
       - `q=financial OR economy OR market OR business` (search query)
       - `lang=${language}` (en or he)
       - `country=${region === 'israel' ? 'il' : ''}` (only for Israel)
       - `max=27` (batch size)
       - `page=${calculatedApiPage}` (GNews uses 1-indexed pages)
       - `apikey=${import.meta.env.VITE_GNEWS_API_KEY}`
     - Fetch from API
     - Transform response to normalize structure:
       ```javascript
       {
         id: article.url,  // Use URL as unique ID
         title: article.title,
         description: article.description,
         url: article.url,
         publishedAt: article.publishedAt,
         source: article.source.name,
         image: article.image
       }
       ```
     - Deduplicate: Filter out articles with URLs already in cache
     - Append to cache
     - Update `hasMore` flag (false if API returned < 27 items)

3. **Rate Limit Guards**:
   - If API key missing: Return error object `{ error: 'API_KEY_MISSING', newsItems: [], hasMore: false }`
   - If fetch fails: Return error object `{ error: 'FETCH_FAILED', newsItems: [], hasMore: false }`
   - Never make duplicate concurrent requests (handled by hook's `isLoading` state)

4. **Deduplication Strategy**:
   ```javascript
   const existingUrls = new Set(cachedData.newsItems.map((item) => item.url));
   const uniqueNewItems = freshItems.filter(
     (item) => !existingUrls.has(item.url),
   );
   ```

**Why This Design**:

- **Session cache**: Reusing data when navigating back prevents wasted API calls
- **Batch fetching**: 27 items = 3 pages of 9, optimizes request count
- **Deduplication**: GNews may return duplicates across pages, URL is most reliable unique identifier
- **Error objects**: Allow graceful degradation, page can display appropriate UI
- **Separation of concerns**: Service knows nothing about React state, just data fetching and caching

**Max Lines**: ~100 lines (well under 150 limit)

---

## F. Financial News State Hook

### F1. Create useFinancialNews Hook

**File**: `src/hooks/useFinancialNews.js` (new file)

**Purpose**: Manage all state and side effects for the Financial News page, keeping the page component clean and under 150 lines.

**State Schema**:

```javascript
{
  region: 'global' | 'israel',
  currentPage: number,           // 1-indexed
  newsItems: Array,              // All fetched news (accumulates)
  loadedBatches: number,         // How many batches of 27 we've loaded
  isLoading: boolean,
  hasMore: boolean,              // Can fetch more from API?
  error: string | null
}
```

**Hook API**:

```javascript
export const useFinancialNews = (language) => {
  // State
  const [region, setRegion] = useState('global');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsItems, setNewsItems] = useState([]);
  const [loadedBatches, setLoadedBatches] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Computed
  const itemsPerPage = 9;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const paginatedItems = newsItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Methods
  const changeRegion = (newRegion) => { ... };
  const goToPage = (page) => { ... };
  const refetch = () => { ... };

  return {
    region,
    currentPage,
    newsItems: paginatedItems,
    totalPages,
    isLoading,
    hasMore,
    error,
    changeRegion,
    goToPage
  };
};
```

**Critical Logic**:

1. **Initial Fetch** (on mount or when language/region changes):

   ```javascript
   useEffect(() => {
     // Reset all state
     setNewsItems([]);
     setLoadedBatches(0);
     setCurrentPage(1);
     setError(null);

     // Fetch first batch
     loadBatch(1);
   }, [language, region]);
   ```

2. **Pagination Trigger** (pseudocode):

   ```
   When user navigates to page N:
     Calculate required batches = ceil(N / 3)  // Since 27 items = 3 pages of 9

     If required batches > loadedBatches:
       Fetch next batch
       Increment loadedBatches
   ```

   Example:
   - Pages 1-3: Need 1 batch (already loaded on mount)
   - Page 4: Need 2 batches → trigger fetch when entering page 4
   - Page 7: Need 3 batches → trigger fetch when entering page 7
   - Page 10: Need 4 batches → trigger fetch when entering page 10

3. **Batch Loading**:

   ```javascript
   const loadBatch = async (batchNumber) => {
     if (isLoading || !hasMore) return;

     setIsLoading(true);
     const result = await newsApiService.fetchFinancialNews(
       language,
       region,
       batchNumber,
     );

     if (result.error) {
       setError(result.error);
     } else {
       setNewsItems((prev) => [...prev, ...result.newsItems]);
       setHasMore(result.hasMore);
       setLoadedBatches(batchNumber);
     }

     setIsLoading(false);
   };
   ```

4. **Region Change Handler**:

   ```javascript
   const changeRegion = (newRegion) => {
     setRegion(newRegion);
     // Reset happens in useEffect watching region
   };
   ```

5. **Page Change Handler**:
   ```javascript
   const goToPage = (page) => {
     // Check if need to load more data
     const requiredBatches = Math.ceil((page * itemsPerPage) / 27);

     if (requiredBatches > loadedBatches && hasMore && !isLoading) {
       loadBatch(loadedBatches + 1);
     }

     setCurrentPage(page);
     window.scrollTo({ top: 400, behavior: "smooth" });
   };
   ```

**Why This Design**:

- **Encapsulation**: All complex state logic hidden from page component
- **Automatic resets**: useEffect dependencies handle language/region changes
- **Smart fetching**: Only fetch when actually needed (entering a page that requires more data)
- **Cache integration**: Service layer handles cache, hook just orchestrates fetches
- **Separation**: Hook knows about React state, service knows about API

**Max Lines**: ~120-140 lines (under 150 limit)

---

## G. Financial News Page

### G1. Create Financial News Page Component

**File**: `src/pages/FinancialNews.jsx` (new file)

**Purpose**: Render the Financial News UI using the custom hook.

**Component Structure**:

```jsx
import { useLanguage } from "../hooks/useLanguage";
import { useFinancialNews } from "../hooks/useFinancialNews";
import { Select } from "../components/ui/Select";
import { Pagination } from "../components/ui/Pagination";
import { LoadingGrid } from "../components/ui/LoadingGrid";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { NewsItemCard } from "../components/ui/NewsItemCard";
import { SectionHeading } from "../components/ui/SectionHeading";

export const FinancialNews = () => {
  const { t, language, isRtl } = useLanguage();
  const {
    region,
    currentPage,
    newsItems,
    totalPages,
    isLoading,
    hasMore,
    error,
    changeRegion,
    goToPage,
  } = useFinancialNews(language);

  // Region selector options
  const regionOptions = [
    { value: "global", label: t.financialNews.regionSelector.global },
    { value: "israel", label: t.financialNews.regionSelector.israel },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <SectionHeading
          title={t.financialNews.title}
          subtitle={t.financialNews.regionSelector.label}
        />

        {/* Region Filter */}
        <div className="flex justify-center mb-12">
          <Select
            value={region}
            onValueChange={changeRegion}
            options={regionOptions}
            dir={isRtl ? "rtl" : "ltr"}
            className="min-w-[240px]"
          />
        </div>

        {/* Error State */}
        {error && (
          <ErrorState
            title={t.financialNews.error.title}
            message={
              error === "API_KEY_MISSING"
                ? t.financialNews.error.apiKeyMissing
                : t.financialNews.error.fetchFailed
            }
          />
        )}

        {/* Loading State */}
        {isLoading && newsItems.length === 0 && <LoadingGrid count={9} />}

        {/* Empty State */}
        {!isLoading && !error && newsItems.length === 0 && (
          <EmptyState
            title={t.financialNews.empty.title}
            message={t.financialNews.empty.description}
          />
        )}

        {/* News Grid */}
        {!error && newsItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {newsItems.map((item) => (
                <NewsItemCard key={item.id} item={item} language={language} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={goToPage}
                isRtl={isRtl}
              />
            </div>

            {/* Loading Indicator for Additional Batches */}
            {isLoading && newsItems.length > 0 && (
              <div className="text-center mt-8 text-slate-600">
                {t.financialNews.loading}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
```

**Why This Structure**:

- **Conditional rendering**: Show appropriate UI based on state (loading/error/empty/data)
- **Reuse existing components**: `Select`, `Pagination`, `LoadingGrid`, `ErrorState`, `EmptyState`, `SectionHeading`
- **Grid layout**: Matches existing News page (3 columns on large screens)
- **Loading states**: Initial load shows full skeleton, subsequent loads show spinner below grid
- **No logic**: All state management delegated to hook

**Max Lines**: ~80-100 lines (well under 150 limit)

---

## H. News Item Card

### H1. Create News Item Card Component

**File**: `src/components/ui/NewsItemCard.jsx` (new file)

**Purpose**: Display a single external news article with proper external link behavior.

**Component Structure**:

```jsx
import { Calendar, ExternalLink } from "lucide-react";

export const NewsItemCard = ({ item, language }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === "he" ? "he-IL" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      {item.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Date & Source */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <time dateTime={item.publishedAt}>
              {formatDate(item.publishedAt)}
            </time>
          </div>
          {item.source && (
            <span className="text-slate-600 font-medium">{item.source}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-3 mb-4">
          {item.description}
        </p>

        {/* External Link Indicator */}
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
          <span>Read more</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};
```

**Why This Design**:

- **Semantic HTML**: Uses `<a>` tag (not button or div) for proper link behavior
- **Security**: `rel="noopener noreferrer"` prevents security vulnerabilities when opening external sites
- **Accessibility**: `target="_blank"` with external link icon clearly indicates new tab behavior
- **Visual consistency**: Matches existing `NewsCard` styling (rounded-xl, shadow-md, hover effects)
- **Visual distinction**: External link icon differentiates from internal article cards
- **Responsive image**: aspect-video maintains proper ratios, hover scale adds interaction
- **Date formatting**: Uses Intl.DateTimeFormat for locale-aware date display
- **Truncation**: line-clamp prevents overly long titles/descriptions from breaking layout

**Max Lines**: ~60-70 lines (well under 150 limit)

---

## I. Manual Testing Checklist

After implementation, manually verify:

### Navigation

- [ ] Desktop navbar shows Select dropdown instead of "News & Articles" link
- [ ] Dropdown displays "Financial News" and "Articles" options (localized)
- [ ] Selecting "Financial News" navigates to `/financial-news`
- [ ] Selecting "Articles" navigates to `/news` (existing page)
- [ ] Mobile navbar shows two separate buttons for Financial News and Articles
- [ ] Mobile menu closes after selection

### Financial News Page - Basic Functionality

- [ ] Page loads without errors when `VITE_GNEWS_API_KEY` is configured
- [ ] Page shows error state when `VITE_GNEWS_API_KEY` is missing
- [ ] Region selector shows "Global" and "Israel" options (localized)
- [ ] Default region is "Global"
- [ ] News cards display: title, date, description, source
- [ ] Clicking a news card opens external URL in new tab
- [ ] External links have security attributes (`rel="noopener noreferrer"`)

### Pagination & Fetching

- [ ] Initial load fetches 27 articles
- [ ] First page shows 9 news cards
- [ ] Pagination shows correct total pages (based on 9 per page)
- [ ] Navigating to page 2-3 shows cached data (no new fetch)
- [ ] Navigating to page 4 triggers new fetch (second batch of 27)
- [ ] Navigating to page 7 triggers another fetch (third batch of 27)
- [ ] Pagination disables "Next" when `hasMore === false`
- [ ] Scrolls to top smoothly when changing pages

### Region Switching

- [ ] Changing region from Global to Israel:
  - Resets pagination to page 1
  - Clears existing news
  - Fetches fresh data with `lang=he` and `country=il`
- [ ] Changing region from Israel to Global:
  - Resets pagination to page 1
  - Clears existing news
  - Fetches fresh data with `lang=en` (no country param)
- [ ] Region change shows loading state during fetch
- [ ] Region change respects cache (returning to previously visited region reuses data)

### Language Switching

- [ ] Changing site language (navbar toggle):
  - Triggers fresh API fetch
  - Resets pagination to page 1
  - Clears existing news
  - Updates all UI labels to new language
- [ ] English language uses `lang=en` API parameter
- [ ] Hebrew language uses `lang=he` API parameter
- [ ] No mixed-language content ever appears in news list

### Caching Behavior

- [ ] Navigating away from Financial News and returning reuses cached data (no new fetch)
- [ ] Cache is keyed by `{language, region}` combination
- [ ] Switching language creates separate cache entry
- [ ] Switching region creates separate cache entry
- [ ] Cache persists for session (lost on page refresh - expected behavior)

### Loading & Error States

- [ ] Initial load shows `LoadingGrid` with 9 skeleton cards
- [ ] Subsequent page loads (batch fetches) show small loading indicator below grid
- [ ] API failure shows `ErrorState` with appropriate message
- [ ] Empty results show `EmptyState` with message
- [ ] Loading states don't block UI interaction (can change region during load)

### Rate Limit Safety

- [ ] Rapid region switching doesn't trigger duplicate API calls
- [ ] `isLoading` state prevents concurrent fetches
- [ ] Pagination doesn't fetch when `hasMore === false`
- [ ] Returning to cached region doesn't fetch again

### Articles Page (Zero Regressions)

- [ ] Existing `/news` route still works
- [ ] Static articles display correctly
- [ ] Article search functionality unchanged
- [ ] Article pagination works (9 per page)
- [ ] Clicking article navigates to `/news/:id` (internal routing)
- [ ] Article detail page displays full content
- [ ] No broken links or missing images

### Accessibility

- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible on Select dropdowns
- [ ] External links announce "opens in new tab" (screen reader)
- [ ] Date formatting respects locale
- [ ] RTL layout works correctly for Hebrew

### Edge Cases

- [ ] Deduplication works (same article URL doesn't appear twice)
- [ ] API returning < 27 items sets `hasMore = false`
- [ ] No console errors or warnings
- [ ] Images with missing URLs don't break card layout
- [ ] Very long titles/descriptions truncate properly (line-clamp)

---

## Implementation Order

Follow this exact sequence to minimize risk and enable incremental testing:

1. **Setup & Translations** (Steps A, B)
   - Add `.env` file
   - Update `global.json`
   - Create `financialNews.json`
   - Update `translations.js`
   - **Test**: Verify translations load without errors

2. **Routing** (Step C)
   - Update `paths.js`
   - Add route to `App.jsx` (initially renders placeholder component)
   - **Test**: Navigate to `/financial-news` shows placeholder

3. **API Service** (Step E)
   - Create `newsApiService.js`
   - Implement cache, fetch, deduplication
   - **Test**: Import service in browser console, verify cache Map structure

4. **State Hook** (Step F)
   - Create `useFinancialNews.js`
   - Implement state management and pagination logic
   - **Test**: Use hook in placeholder component, log state to console

5. **UI Components** (Steps G, H)
   - Create `NewsItemCard.jsx`
   - Create `FinancialNews.jsx`
   - **Test**: Full page functionality, verify all states (loading/error/data)

6. **Navbar** (Step D)
   - Update `NavbarDesktopNav.jsx`
   - Update `NavbarMobileMenu.jsx`
   - Update `Navbar.jsx` to pass `navigate` prop
   - **Test**: Navigation works from both desktop and mobile

7. **Full Integration Testing** (Step I)
   - Run through entire manual testing checklist
   - Fix any issues found
   - Verify zero regressions in Articles page

---

## File Size Verification

Before marking complete, verify line counts:

```bash
wc -l src/services/newsApiService.js          # Must be ≤ 150
wc -l src/hooks/useFinancialNews.js            # Must be ≤ 150
wc -l src/pages/FinancialNews.jsx              # Must be ≤ 150
wc -l src/components/ui/NewsItemCard.jsx       # Must be ≤ 150
wc -l src/components/layout/navbar/NavbarDesktopNav.jsx  # Must be ≤ 150
wc -l src/components/layout/navbar/NavbarMobileMenu.jsx  # Must be ≤ 150
```

If any file exceeds 150 lines:

- Extract helper functions to `src/utils/helpers/`
- Split UI into smaller sub-components
- Simplify conditional rendering logic

---

## Success Criteria

✅ TODO.md is complete and detailed
✅ All files created/modified as specified
✅ No file exceeds 150 lines
✅ Arrow functions used exclusively
✅ Financial News page fully functional
✅ Region filter works (Global / Israel)
✅ Pagination triggers correct fetches
✅ Language changes trigger fresh fetches
✅ Session cache prevents duplicate API calls
✅ External links open in new tabs
✅ Articles page has zero regressions
✅ All manual tests pass
✅ No console errors or warnings
✅ Code follows existing patterns and conventions

---

**REMEMBER**: Do not deviate from this plan. Each step has a reason. Each constraint exists for maintainability and quality. Follow exactly.
