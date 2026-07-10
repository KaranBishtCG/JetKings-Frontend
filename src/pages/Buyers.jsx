import React, { useState } from 'react'
import BuyersHeader from '../components/buyers/BuyersHeader'
import BuyersStats from '../components/buyers/BuyersStats'
import BuyersTable from '../components/buyers/BuyersTable'
import BuyersPagination from '../components/buyers/BuyersPagination'

const ALL_BUYERS = [
  {
    id: 1,
    initials: 'AK',
    avatarBg: 'bg-[#1a2340]',
    name: 'Aryan Kitchen & Bath',
    type: 'Wholesale Partner',
    gst: '27AABCU2234F1Z5',
    phone: '+91 98765 43210',
    address: 'Sector 12, Industrial Hub, Pune, Maharashtra',
  },
  {
    id: 2,
    initials: 'MS',
    avatarBg: 'bg-teal-600',
    name: 'Modern Sanitary Store',
    type: 'Retail Client',
    gst: '07AACR93875G2Z1',
    phone: '+91 98822 17700',
    address: 'Main Market Road, Lajpat Nagar, Delhi',
  },
  {
    id: 3,
    initials: 'BP',
    avatarBg: 'bg-purple-600',
    name: 'Blue Pearl Ceramics',
    type: 'Contractor',
    gst: '24AAHCB12239D1Z4',
    phone: '+91 77711 99533',
    address: 'Ring Road, GIDC Estate, Morbi, Gujarat',
  },
  {
    id: 4,
    initials: 'EC',
    avatarBg: 'bg-gray-600',
    name: 'Elite Chrome Fittings',
    type: 'Distributor',
    gst: '33AABI44556L1Z9',
    phone: '+91 91234 56789',
    address: 'Ambattur Industrial Estate, Chennai',
  },
  {
    id: 5,
    initials: 'RH',
    avatarBg: 'bg-orange-500',
    name: 'Royal Hardware Depot',
    type: 'Wholesale Partner',
    gst: '06AAACR3504C1ZI',
    phone: '+91 99001 23456',
    address: 'Okhla Industrial Area, Phase II, New Delhi',
  },
  {
    id: 6,
    initials: 'ST',
    avatarBg: 'bg-blue-500',
    name: 'Sunrise Tiles & Bath',
    type: 'Retail Client',
    gst: '29AABCS3254N1ZP',
    phone: '+91 80123 45678',
    address: 'Rajajinagar, Bengaluru, Karnataka',
  },
  {
    id: 7,
    initials: 'PM',
    avatarBg: 'bg-rose-600',
    name: 'Pioneer Marble Works',
    type: 'Contractor',
    gst: '08AAACR2533G1ZE',
    phone: '+91 94111 22334',
    address: 'MI Road, Jaipur, Rajasthan',
  },
  {
    id: 8,
    initials: 'DF',
    avatarBg: 'bg-indigo-600',
    name: 'Delta Faucets India',
    type: 'Distributor',
    gst: '36AABCD4512H1ZK',
    phone: '+91 40234 56789',
    address: 'Begumpet, Hyderabad, Telangana',
  },
]

const PER_PAGE = 4

function Buyers() {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(ALL_BUYERS.length / PER_PAGE)
  const paginated = ALL_BUYERS.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <BuyersHeader onAddBuyer={() => {}} />
      <BuyersStats />
      <BuyersTable
        buyers={paginated}
        onView={(b) => console.log('View', b)}
        onEdit={(b) => console.log('Edit', b)}
        onDelete={(b) => console.log('Delete', b)}
      />
      <BuyersPagination
        currentPage={page}
        totalPages={totalPages}
        total={1248}
        perPage={PER_PAGE}
        onPageChange={setPage}
      />
    </div>
  )
}

export default Buyers