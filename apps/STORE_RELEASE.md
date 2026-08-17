# Kutengeneza na Kuweka KaribuStay kwenye Stores

Kuna apps mbili tofauti za kuchapisha:

| App | Watumiaji | Android package / iPhone bundle ID |
| --- | --- | --- |
| KaribuStay | Wateja wanaotafuta na kuomba accommodation | `com.karibustay.customer` |
| KaribuStay Host | Hosts wanaosimamia properties na booking requests | `com.karibustay.host` |

Admin hatumpeleki App Store au Play Store. Anaendelea kutumia `admin.html` kwenye website yenye login ya admin.

## Kabla ya kutengeneza store build

1. Nakili `.env.example` kuwa `.env` ndani ya `apps/customer` na `apps/host`, kisha weka Supabase URL na publishable/anon key ya production. Usiiweke `.env` kwenye Git.
2. Hakikisha database, Supabase storage, na RLS policies vimewekwa kulingana na `Backend Schema.txt`. Tumia accounts za majaribio kujaribu flow nzima: host verification, property approval, booking request, host response, na review.
3. Weka privacy policy na terms za KaribuStay kwenye website ya umma. Google na Apple huomba link hizi wakati wa kuwasilisha app.
4. Fungua Google Play Console na Apple Developer accounts za biashara ya KaribuStay. Taarifa za kisheria, support email, screenshots za apps, na maelezo ya app vitawekwa kwenye accounts hizo.

## Kutengeneza build

Kwa kila app, ingia kwenye folder lake na uendeshe:

```powershell
npx eas login
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

KaribuStay na KaribuStay Host zinatumwa kama listings mbili tofauti. Baada ya Google/Apple kukubali ukaguzi wao, watu watazipata kwa kutafuta majina hayo kwenye Play Store na App Store.

## Kwa maendeleo na majaribio

```powershell
npm install
npm run android
```

Kwa iPhone, tumia `npm run ios` kwenye Mac yenye Xcode, au tumia EAS build ya cloud hapo juu.
