export const PRODUCTS = [
  { id: 1,  name: 'Premium Mixer Tap',        description: 'Single lever, chrome finish, 360° swivel spout for kitchen & bath',         category: 'Taps & Mixers',  price: 1200, mrp: 1500, unit: 'per piece', imgBg: 'bg-blue-50'   },
  { id: 2,  name: 'Wall Mounted Basin',        description: 'Ceramic white gloss, space-saving design, includes mounting hardware',       category: 'Wash Basins',    price:  850, mrp: 1100, unit: 'per piece', imgBg: 'bg-teal-50'   },
  { id: 3,  name: 'Dual Flush System',         description: 'Water-saving 3L / 6L dual flush mechanism, universal fit',                  category: 'Flush Systems',  price: 2400, mrp: 2800, unit: 'per set',   imgBg: 'bg-indigo-50' },
  { id: 4,  name: 'Eco Smart Tap',             description: 'Sensor-operated touchless tap, battery-powered, brass body',                category: 'Taps & Mixers',  price: 1550, mrp: 1900, unit: 'per piece', imgBg: 'bg-emerald-50'},
  { id: 5,  name: 'Concealed Cistern',         description: 'In-wall flush tank, 9L capacity, slim profile with side inlet',             category: 'Flush Systems',  price: 3200, mrp: 3800, unit: 'per piece', imgBg: 'bg-rose-50'   },
  { id: 6,  name: 'Overhead Rain Shower',      description: '12" stainless steel overhead shower, anti-limescale silicone nozzles',      category: 'Showers',        price: 1800, mrp: 2200, unit: 'per piece', imgBg: 'bg-amber-50'  },
  { id: 7,  name: 'Pull-Out Kitchen Tap',      description: 'High-arc pull-out spray head, stainless finish, anti-drip cartridge',       category: 'Taps & Mixers',  price: 1750, mrp: 2100, unit: 'per piece', imgBg: 'bg-sky-50'    },
  { id: 8,  name: 'Pedestal Basin',            description: 'Full pedestal, vitreous china, white, includes waste fittings',             category: 'Wash Basins',    price: 1100, mrp: 1400, unit: 'per piece', imgBg: 'bg-violet-50' },
  { id: 9,  name: 'Thermostatic Shower Mixer', description: 'Preset temperature control, anti-scald safety, chrome finish',              category: 'Showers',        price: 4200, mrp: 5000, unit: 'per set',   imgBg: 'bg-orange-50' },
  { id: 10, name: 'Bottle Trap',               description: 'Chrome plated brass bottle trap, adjustable height, P-type outlet',         category: 'Wash Basins',    price:  350, mrp:  500, unit: 'per piece', imgBg: 'bg-pink-50'   },
  { id: 11, name: 'Flush Valve',               description: 'High-pressure flush valve, 25mm inlet, durable rubber seal',                category: 'Flush Systems',  price:  550, mrp:  750, unit: 'per piece', imgBg: 'bg-lime-50'   },
  { id: 12, name: 'Handheld Shower Head',      description: '5-function spray, 1.5m stainless hose, built-in flow restrictor',           category: 'Showers',        price:  950, mrp: 1200, unit: 'per piece', imgBg: 'bg-cyan-50'   },
]

export const BUYERS = [
  'Aryan Kitchen & Bath',
  'Modern Sanitary Store',
  'Blue Pearl Ceramics',
  'Elite Chrome Fittings',
  'Royal Hardware Depot',
]

export const CATEGORIES = ['All', 'Taps & Mixers', 'Wash Basins', 'Flush Systems', 'Showers']

export const GST_RATE = 0.05

export const PER_PAGE = 4

export const fmt = (n) => n.toLocaleString('en-IN', { minimumFractionDigits: 2 })
