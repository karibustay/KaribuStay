# Kutengeneza na Kuweka Nerava kwenye Stores

Kuna apps mbili tofauti za kuchapisha:

| App | Watumiaji | Android package / iPhone bundle ID |
| --- | --- | --- |
| Nerava | Wateja wanaotafuta na kuomba accommodation | `com.nerava.customer` |
| Nerava Host | Hosts wanaosimamia properties na booking requests | `com.nerava.host` |

Admin hatumpeleki App Store au Play Store. Anaendelea kutumia `admin.html` kwenye website yenye login ya admin.

## Kabla ya kutengeneza store build

1. Kwa majaribio ya kompyuta, nakili `.env.example` kuwa `.env` ndani ya `apps/customer` na `apps/host`, kisha weka Supabase URL na publishable/anon key ya production. Usiiweke `.env` kwenye Git.
2. Kwa cloud builds, baada ya kuingia EAS, weka values hizi kwenye environment ya `development`, `preview`, na `production` kwa kila app:

```powershell
npx eas env:set --name EXPO_PUBLIC_SUPABASE_URL --value https://vxuziqogjtzbdrowakeg.supabase.co --environment production --visibility plaintext
npx eas env:set --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value YOUR_SUPABASE_PUBLISHABLE_KEY --environment production --visibility plaintext
```

Rudia kwa `preview` na `development` au tumia values za mazingira hayo. `EXPO_PUBLIC_` values zinaonekana kwenye app iliyojengwa, kwa hiyo usitumie service-role key au secret nyingine.
3. Hakikisha database, Supabase storage, na RLS policies vimewekwa kulingana na `Backend Schema.txt`. Tumia accounts za majaribio kujaribu flow nzima: host verification, property approval, booking request, host response, na review.
4. Weka Supabase Site URL kuwa `https://karibustay.co.tz` na ongeza `https://karibustay.co.tz/reset.html` kwenye Redirect URLs. Weka Custom SMTP kabla ya kutegemea signup au reset emails za wateja.
5. Privacy Policy na Terms za Nerava zipo kwenye `privacy.html` na `terms.html`; zipitie na wakili kabla ya launch. Google na Apple huomba links hizi wakati wa kuwasilisha app.
6. Fungua Google Play Console na Apple Developer accounts za biashara ya Nerava. Taarifa za kisheria, support email, screenshots za apps, na maelezo ya app vitawekwa kwenye accounts hizo.

## Kutengeneza build

Kwa kila app, ingia kwenye folder lake na uendeshe:

```powershell
npm run typecheck
npx eas login
npx eas init
npx eas build --platform android --profile production
npx eas build --platform ios --profile production
```

Fanya hivi kwanza ndani ya `apps/customer`, kisha urudie ndani ya `apps/host`. Mfumo utatengeneza Android App Bundle ya Play Store na iOS build ya App Store Connect.

## Kutuma kwenye stores

Baada ya build kuisha na akaunti za stores kuwa tayari:

```powershell
npx eas submit --platform android --profile production
npx eas submit --platform ios --profile production
```

Nerava na Nerava Host zinatumwa kama listings mbili tofauti. Baada ya Google/Apple kukubali ukaguzi wao, watu watazipata kwa kutafuta majina hayo kwenye Play Store na App Store.

## Kwa maendeleo na majaribio

```powershell
npm install
npm run android
```

Kwa iPhone, tumia `npm run ios` kwenye Mac yenye Xcode, au tumia EAS build ya cloud hapo juu.
