export const providers = [
    { id: 'gdrive', name: 'Google Drive', used: 45, total: 100, color: 'var(--color-provider-gdrive)' },
    { id: 'onedrive', name: 'OneDrive', used: 12, total: 50, color: 'var(--color-provider-onedrive)' },
    { id: 'telegram', name: 'Telegram', used: 124, total: 999, color: 'var(--color-provider-telegram)' },
    { id: 'cloudinary', name: 'Cloudinary', used: 8, total: 25, color: 'var(--color-provider-cloudinary)' },
];
export const files = [
    { id: '1', name: 'Q4_Financials.xlsx', type: 'Spreadsheet', provider: 'onedrive', size: '1.2 MB', date: '2h ago' },
    { id: '2', name: 'Hero_Video_Final.mp4', type: 'Video', provider: 'telegram', size: '245 MB', date: 'Yesterday' },
    { id: '3', name: 'Brand_Guidelines.pdf', type: 'Document', provider: 'gdrive', size: '4.5 MB', date: 'Oct 10' },
    { id: '4', name: 'Product_Shots.zip', type: 'Archive', provider: 'cloudinary', size: '1.8 GB', date: 'Oct 08' },
    { id: '5', name: 'Design_System.fig', type: 'Design', provider: 'gdrive', size: '24 MB', date: 'Oct 07' },
    { id: '6', name: 'Meeting_Notes.txt', type: 'Document', provider: 'onedrive', size: '12 KB', date: 'Oct 06' },
    { id: '7', name: 'Archive_2025.zip', type: 'Archive', provider: 'telegram', size: '4.2 GB', date: 'Oct 01' },
    { id: '8', name: 'Logo_Pack.zip', type: 'Archive', provider: 'cloudinary', size: '14 MB', date: 'Sep 28' },
];
export const shares = [
    { name: 'Project_Proposal_v2.pdf', type: 'Direct Link', downloads: 14, expiry: '23h 45m' },
    { name: 'Q3_Financials.xlsx', type: 'Secure Transfer', downloads: 0, expiry: 'After 1 DL' },
    { name: 'Brand_Assets.zip', type: 'Direct Link', downloads: 8, expiry: '5 days' },
];
export function providerLabel(id: string) {
    return providers.find(p => p.id === id)?.name || id;
}