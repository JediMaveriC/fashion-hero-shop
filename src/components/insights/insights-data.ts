export type Category = 'sukienki' | 'obuwie' | 'sportswear' | 'bizuteria'
export type Mode = 'free' | 'plus' | 'external'
export type View = 'overview' | 'returns' | 'season' | 'sizes' | 'prices' | 'competitors' | 'forecast' | 'ai'

export interface SizeData {
  label: string
  value: number
  best?: boolean
  worst?: boolean
}

export interface CategoryData {
  revenue: string; revD: string; revB: string
  rr: string; rrD: string; rrBLabel: string
  conv: string; convD: string; convB: string
  prov: string; provD: string; provB: string
  salesMy: number[]; salesB: number[]
  rrMy: number[]; rrBData: number[]
  season: number[]
  sizes: SizeData[]
}

export const MONTHS = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru']

export const CATEGORY_LABELS: Record<Category, string> = {
  sukienki: 'Sukienki damskie',
  obuwie: 'Obuwie',
  sportswear: 'Odzież sportowa',
  bizuteria: 'Biżuteria',
}

export const categoryData: Record<Category, CategoryData> = {
  sukienki: {
    revenue: '38 400 PLN', revD: '▲ +14%', revB: 'Bench: +9%',
    rr: '44%', rrD: '▲ +6 pkt', rrBLabel: 'Bench: 32%',
    conv: '3,2%', convD: '→', convB: 'Bench: 3,8%',
    prov: '4 730 PLN', provD: '▼ –8%', provB: '+2 340 pot.',
    salesMy: [8200,7100,9400,11200,10800,9900,8600,7200,9100,10400,11800,12800],
    salesB:  [6800,6200,7900,9800,9400,8700,7400,6100,7800,9200,10100,11200],
    rrMy: [38,39,40,41,40,42,41,43,43,44,44,44],
    rrBData:  [30,30,31,32,31,31,30,31,31,32,33,32],
    season: [140,80,95,170,160,130,75,85,115,145,200,155],
    sizes: [
      {label:'XS',value:2.1},{label:'S',value:4.8,best:true},{label:'M',value:4.1,best:true},
      {label:'L',value:3.2},{label:'XL',value:2.4},{label:'XXL',value:1.3,worst:true},
    ],
  },
  obuwie: {
    revenue: '22 100 PLN', revD: '▲ +8%', revB: 'Bench: +11%',
    rr: '31%', rrD: '▲ +2 pkt', rrBLabel: 'Bench: 28%',
    conv: '4,1%', convD: '→', convB: 'Bench: 4,5%',
    prov: '3 210 PLN', provD: '→', provB: '+380 pot.',
    salesMy: [5100,4800,6200,7800,7200,6500,5900,7100,8400,8900,9800,7200],
    salesB:  [5400,5100,6800,8200,7800,7000,6200,7500,8800,9400,10200,7600],
    rrMy: [27,28,28,29,30,30,29,30,30,31,31,31],
    rrBData:  [25,25,26,27,26,27,26,27,27,28,28,28],
    season: [90,75,120,145,150,135,110,130,165,170,195,140],
    sizes: [
      {label:'36',value:1.8},{label:'37',value:3.2},{label:'38',value:4.9,best:true},
      {label:'39',value:4.4,best:true},{label:'40',value:3.1},{label:'41+',value:1.6,worst:true},
    ],
  },
  sportswear: {
    revenue: '18 700 PLN', revD: '▲ +22%', revB: 'Bench: +18%',
    rr: '24%', rrD: '→', rrBLabel: 'Bench: 25%',
    conv: '5,2%', convD: '▲ +0,3', convB: 'Bench: 4,9%',
    prov: '2 890 PLN', provD: '▲ +19%', provB: 'Powyżej bench.',
    salesMy: [4200,4800,7200,6100,6800,7900,8400,9200,7800,6400,5900,5100],
    salesB:  [3800,4400,6800,5800,6200,7400,8100,8800,7400,6100,5600,4800],
    rrMy: [24,23,24,25,24,24,23,24,24,24,25,24],
    rrBData:  [24,25,25,26,25,25,24,25,25,26,25,25],
    season: [80,85,130,115,120,145,165,180,145,115,105,90],
    sizes: [
      {label:'XS',value:2.8},{label:'S',value:4.2,best:true},{label:'M',value:5.1,best:true},
      {label:'L',value:4.8,best:true},{label:'XL',value:3.4},{label:'XXL',value:1.9,worst:true},
    ],
  },
  bizuteria: {
    revenue: '12 300 PLN', revD: '▲ +6%', revB: 'Bench: +7%',
    rr: '18%', rrD: '▼ –2 pkt', rrBLabel: 'Bench: 20%',
    conv: '6,8%', convD: '▲ +0,6', convB: 'Bench: 6,2%',
    prov: '2 180 PLN', provD: '▲ stabilna', provB: 'Powyżej bench.',
    salesMy: [3200,3800,2900,3100,4200,2800,2400,2600,2900,3100,4800,5800],
    salesB:  [3000,3500,2700,2900,3900,2600,2200,2400,2700,2900,4500,5500],
    rrMy: [20,19,18,18,19,18,17,18,18,18,19,18],
    rrBData:  [21,20,20,21,20,20,19,20,20,20,21,20],
    season: [95,110,85,90,160,75,65,70,80,90,140,200],
    sizes: [
      {label:'XS/S',value:5.2,best:true},{label:'M',value:6.8,best:true},{label:'L',value:4.1},
      {label:'ONE',value:7.2,best:true},{label:'—',value:0},{label:'—',value:0},
    ],
  },
}
