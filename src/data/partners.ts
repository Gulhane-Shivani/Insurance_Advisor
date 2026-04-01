export interface Partner {
  id: string;
  name: string;
  domain: string;
}

export const partners: Partner[] = [
  { id: 'star', name: 'Star Health', domain: 'starhealth.in' },
  { id: 'hdfc', name: 'HDFC Ergo', domain: 'hdfcergo.com' },
  { id: 'icici', name: 'ICICI Lombard', domain: 'icicilombard.com' },
  { id: 'tata', name: 'Tata AIG', domain: 'tataaig.com' },
  { id: 'bajaj', name: 'Bajaj Allianz', domain: 'bajajallianz.com' },
  { id: 'religare', name: 'Religare', domain: 'religarehealthinsurance.com' },
  { id: 'niva', name: 'Niva Bupa', domain: 'nivabupa.com' },
];
