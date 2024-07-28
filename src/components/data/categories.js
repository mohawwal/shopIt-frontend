import men from '../../assets/images/image4.jpg'
import women from '../../assets/images/image6.jpg'
import kids from '../../assets/images/image5.jpg'

export const categories = [
  { 
    id: "men", 
    image: men,
    title: "Men", 
    items: ["Shirt", "T-Shirt", "Polo", "Short", "Trouser", "Jean", "Suit", "Jacket", "Cap"] 
  },
  { 
    id: "women", 
    image: women,
    title: "Women", 
    items: ["Dresses", "Shirt", "Gown", "Jacket", "Bag"]
  },
  { 
    id: "kids", 
    image: kids,
    title: "Kids", 
    items: ["Boys", "Girls", "Shoes"] 
    }

]

export const accessories = [
  {
    title: 'Fragrance',
  },
  {
    title: 'Jewelry',
  },
  {
    title: 'Gifts',
  }
]