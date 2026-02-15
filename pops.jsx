import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, Phone, LayoutDashboard, TrendingUp, Clock, Users, DollarSign, CheckCircle, AlertCircle, Search, ChevronLeft } from 'lucide-react';

// Données initiales
const initialStockItems = [
  { id: 1, name: 'Bœuf haché', category: 'Viandes', quantity: 15, unit: 'kg', lastUpdate: '31/01/2026' },
  { id: 2, name: 'Pain burger', category: 'Boulangerie', quantity: 48, unit: 'pcs', lastUpdate: '31/01/2026' },
  { id: 3, name: 'Tomates', category: 'Légumes', quantity: 8, unit: 'kg', lastUpdate: '31/01/2026' },
  { id: 4, name: 'Salade', category: 'Légumes', quantity: 12, unit: 'pcs', lastUpdate: '31/01/2026' },
  { id: 5, name: 'Fromage Cheddar', category: 'Produits laitiers', quantity: 3, unit: 'kg', lastUpdate: '31/01/2026' },
  { id: 6, name: 'Frites surgelées', category: 'Surgelés', quantity: 25, unit: 'kg', lastUpdate: '31/01/2026' },
  { id: 7, name: 'Coca-Cola', category: 'Boissons', quantity: 72, unit: 'pcs', lastUpdate: '31/01/2026' },
  { id: 8, name: 'Eau Minérale', category: 'Boissons', quantity: 48, unit: 'pcs', lastUpdate: '31/01/2026' },
  { id: 9, name: "Huile d'olive", category: 'Épicerie', quantity: 4, unit: 'L', lastUpdate: '31/01/2026' },
  { id: 10, name: 'Pâtes', category: 'Épicerie', quantity: 8, unit: 'kg', lastUpdate: '31/01/2026' },
];

const menuItems = [
  { id: 1, name: 'Burger Classic', category: 'Burgers', price: 12.50, available: true },
  { id: 2, name: 'Burger Cheese', category: 'Burgers', price: 14.00, available: true },
  { id: 3, name: 'Burger Veggie', category: 'Burgers', price: 13.00, available: true },
  { id: 4, name: 'Frites Maison', category: 'Accompagnements', price: 4.50, available: true },
  { id: 5, name: 'Salade César', category: 'Salades', price: 14.00, available: true },
  { id: 6, name: 'Pizza Margherita', category: 'Pizzas', price: 15.00, available: true },
  { id: 7, name: 'Pizza 4 Fromages', category: 'Pizzas', price: 17.00, available: false },
  { id: 8, name: 'Pâtes Carbonara', category: 'Pâtes', price: 13.00, available: true },
  { id: 9, name: 'Steak Frites', category: 'Plats', price: 22.00, available: true },
  { id: 10, name: 'Coca-Cola', category: 'Boissons', price: 3.50, available: true },
  { id: 11, name: 'Eau Minérale', category: 'Boissons', price: 2.50, available: true },
  { id: 12, name: 'Bière Blonde', category: 'Boissons', price: 5.00, available: true },
  { id: 13, name: 'Vin Rouge', category: 'Boissons', price: 18.00, available: true },
];

const initialOrders = [
  { 
    id: 'ORD-038312', 
    source: 'Caisse', 
    status: 'En attente', 
    customer: 'Client',
    items: [
      { name: 'Burger Cheese', quantity: 1, price: 14.00 },
      { name: 'Salade César', quantity: 1, price: 14.00 },
      { name: 'Pizza Margherita', quantity: 1, price: 15.00 }
    ],
    total: 47.30,
    time: '10:50'
  },
  { 
    id: 'ORD-001', 
    source: 'Agent IA', 
    status: 'En préparation', 
    customer: 'Jean Dupont',
    items: [
      { name: 'Burger Classic', quantity: 2, price: 12.50 },
      { name: 'Frites Maison', quantity: 2, price: 4.50 }
    ],
    total: 40.00,
    time: '12:30'
  },
  { 
    id: 'ORD-002', 
    source: 'Caisse', 
    status: 'Prêt', 
    customer: 'Marie Martin',
    items: [
      { name: 'Salade César', quantity: 1, price: 14.00 },
      { name: 'Eau Minérale', quantity: 1, price: 2.50 }
    ],
    total: 16.50,
    time: '12:45'
  },
  { 
    id: 'ORD-003', 
    source: 'Agent IA', 
    status: 'En attente', 
    customer: 'Pierre Bernard',
    items: [
      { name: 'Steak Frites', quantity: 1, price: 22.00 },
      { name: 'Coca-Cola', quantity: 1, price: 3.50 }
    ],
    total: 23.50,
    time: '13:00'
  },
  { 
    id: 'ORD-004', 
    source: 'Caisse', 
    status: 'Terminé', 
    customer: 'Sophie Leroy',
    items: [
      { name: 'Pâtes Carbonara', quantity: 2, price: 13.00 },
      { name: 'Vin Rouge', quantity: 1, price: 18.00 }
    ],
    total: 44.00,
    time: '13:15'
  },
];

const recentCalls = [
  { phone: '+33 6 12 34 56 78', status: 'Commande passée', time: '14:32', duration: '3:45' },
  { phone: '+33 6 98 76 54 32', status: 'Renseignements', time: '14:28', duration: '1:20' },
  { phone: '+33 6 55 44 33 22', status: 'Manqué', time: '14:15', duration: '0:00' },
];

export default function FoodFlow() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [stockItems] = useState(initialStockItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [stockCategory, setStockCategory] = useState('Toutes les catégories');

  const categories = ['Tout', 'Burgers', 'Accompagnements', 'Salades', 'Pizzas', 'Pâtes', 'Plats', 'Boissons', 'Desserts'];
  const stockCategories = ['Toutes les catégories', 'Viandes', 'Boulangerie', 'Légumes', 'Produits laitiers', 'Surgelés', 'Boissons', 'Épicerie'];

  const filteredMenuItems = menuItems.filter(item => 
    (selectedCategory === 'Tout' || item.category === selectedCategory)
  );

  const filteredStockItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = stockCategory === 'Toutes les catégories' || item.category === stockCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setSelectedOrder(null);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'En attente': return 'text-blue-400 bg-blue-500/10';
      case 'En préparation': return 'text-orange-400 bg-orange-500/10';
      case 'Prêt': return 'text-green-400 bg-green-500/10';
      case 'Terminé': return 'text-gray-400 bg-gray-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const Sidebar = () => (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 p-6 flex flex-col">
      <div className="mb-12">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          FoodFlow
        </h1>
      </div>
      
      <nav className="space-y-2 flex-1">
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'commandes', icon: ShoppingCart, label: 'Commandes' },
          { id: 'caisse', icon: DollarSign, label: 'Caisse' },
          { id: 'stocks', icon: Package, label: 'Stocks' },
          { id: 'agent', icon: Phone, label: 'Agent IA' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              currentPage === item.id
                ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const Dashboard = () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-slate-400">Vue d'ensemble de votre activité</p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Chiffre d'affaires</span>
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <DollarSign className="text-blue-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">12 847,5€</div>
          <div className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp size={14} />
            +12.5% vs hier
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Commandes</span>
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <ShoppingCart className="text-emerald-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">342</div>
          <div className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp size={14} />
            +8.2% vs hier
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Appels Agent IA</span>
            <div className="bg-purple-500/10 p-2 rounded-lg">
              <Phone className="text-purple-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">156</div>
          <div className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp size={14} />
            +15.3% vs hier
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Taux de RDV</span>
            <div className="bg-orange-500/10 p-2 rounded-lg">
              <CheckCircle className="text-orange-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">78.5%</div>
          <div className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp size={14} />
            +5.2% vs hier
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Panier moyen</span>
            <div className="bg-cyan-500/10 p-2 rounded-lg">
              <TrendingUp className="text-cyan-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">37.56€</div>
          <div className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp size={14} />
            +3.8% vs hier
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Chiffre d'affaires hebdomadaire</h3>
          <div className="h-64 flex items-end gap-4">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => {
              const heights = [60, 65, 70, 75, 85, 95, 80];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t-lg transition-all duration-500 hover:from-emerald-400 hover:to-cyan-400"
                    style={{ height: `${heights[i]}%` }}
                  />
                  <span className="text-xs text-slate-400">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Répartition des commandes</h3>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="75 25" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="15 85" strokeDashoffset="-75" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="10 90" strokeDashoffset="-90" />
              </svg>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-slate-300">Agent IA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-slate-300">Caisse</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm text-slate-300">En ligne</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Commandes = () => (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Commandes</h2>
        <p className="text-slate-400">Gérez vos commandes en temps réel</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedOrder?.id === order.id ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold text-white">{order.id}</h3>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300">{order.source}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-2xl font-bold text-emerald-400">{order.total.toFixed(2)}€</div>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-sm">
                <span>{order.customer}</span>
                <div className="flex items-center gap-4">
                  <span>{order.items.length} article(s) • {order.time}</span>
                  <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          {selectedOrder ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white">{selectedOrder.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-slate-400">Client</p>
                <p className="text-white font-medium">{selectedOrder.customer}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-3">Articles</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-slate-300">{item.quantity}x {item.name}</span>
                      <span className="text-white font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-emerald-400">{selectedOrder.total.toFixed(2)}€</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-3">Changer le statut</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['En attente', 'En préparation', 'Prêt', 'Terminé', 'Annulé'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedOrder.status === status
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                <ShoppingCart className="text-slate-500" size={48} />
              </div>
              <p className="text-slate-400">Sélectionnez une commande pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const Caisse = () => (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Caisse</h2>
        <p className="text-slate-400">Système de point de vente</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredMenuItems.map(item => (
              <button
                key={item.id}
                onClick={() => item.available && addToCart(item)}
                disabled={!item.available}
                className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border rounded-2xl p-6 text-left transition-all duration-300 ${
                  item.available
                    ? 'border-slate-700/50 hover:scale-105 hover:border-emerald-500/50 cursor-pointer'
                    : 'border-slate-800 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="mb-2">
                  <h3 className="font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-slate-400">{item.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-400">{item.price.toFixed(2)}€</span>
                  {!item.available && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">Indisponible</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6">Panier</h3>
          
          <input
            type="text"
            placeholder="Nom du client (optionnel)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full mb-6 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                <ShoppingCart className="text-slate-500" size={48} />
              </div>
              <p className="text-slate-400">Aucun article dans le panier</p>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.quantity}x {item.price.toFixed(2)}€</p>
                  </div>
                  <span className="text-emerald-400 font-bold">{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 mb-6 pt-6 border-t border-slate-700">
            <div className="flex justify-between text-slate-400">
              <span>Sous-total</span>
              <span>{cartTotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>TVA (10%)</span>
              <span>{(cartTotal * 0.1).toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-2xl font-bold pt-3 border-t border-slate-700">
              <span className="text-white">Total</span>
              <span className="text-emerald-400">{(cartTotal * 1.1).toFixed(2)}€</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Espèces
            </button>
            <button className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30">
              Carte
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Stocks = () => (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Stocks</h2>
        <p className="text-slate-400">Gestion des stocks en temps réel</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <select
          value={stockCategory}
          onChange={(e) => setStockCategory(e.target.value)}
          className="px-6 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
        >
          {stockCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredStockItems.map(item => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:border-emerald-500/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <Package className="text-emerald-400" size={24} />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{item.quantity}</div>
                <div className="text-slate-400 text-sm">{item.unit}</div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
            <p className="text-sm text-slate-400 mb-3">{item.category}</p>
            <p className="text-xs text-slate-500">Mis à jour: {item.lastUpdate}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const AgentIA = () => (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Agent IA Réceptionniste</h2>
          <p className="text-slate-400">Statistiques et historique des appels</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full font-semibold flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          En ligne
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Appels totaux</span>
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <Phone className="text-blue-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">156</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Appels répondus</span>
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <CheckCircle className="text-emerald-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">148</div>
          <div className="text-emerald-400 text-sm">94.9% de réponse</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Appels manqués</span>
            <div className="bg-red-500/10 p-2 rounded-lg">
              <AlertCircle className="text-red-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">8</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Durée moyenne</span>
            <div className="bg-purple-500/10 p-2 rounded-lg">
              <Clock className="text-purple-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">2m 34s</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">Commandes passées</span>
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <ShoppingCart className="text-emerald-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">89</div>
          <div className="text-emerald-400 text-sm">60.1% conversion</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm">RDV pris</span>
            <div className="bg-orange-500/10 p-2 rounded-lg">
              <CheckCircle className="text-orange-400" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">42</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Performance</h3>
          <div className="space-y-4">
            {[
              { label: 'Taux de réponse', value: 94.9, color: 'emerald' },
              { label: 'Taux de conversion', value: 60.1, color: 'blue' },
              { label: 'Satisfaction client', value: 92, color: 'purple' }
            ].map(metric => (
              <div key={metric.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">{metric.label}</span>
                  <span className="text-white font-bold">{metric.value}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 transition-all duration-1000`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Appels récents</h3>
          <div className="space-y-4">
            {recentCalls.map((call, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    call.status === 'Manqué' ? 'bg-red-500/10' : 'bg-emerald-500/10'
                  }`}>
                    <Phone className={call.status === 'Manqué' ? 'text-red-400' : 'text-emerald-400'} size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{call.phone}</p>
                    <p className="text-sm text-slate-400">{call.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{call.time}</p>
                  <p className="text-sm text-slate-400">{call.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'commandes' && <Commandes />}
        {currentPage === 'caisse' && <Caisse />}
        {currentPage === 'stocks' && <Stocks />}
        {currentPage === 'agent' && <AgentIA />}
      </div>
    </div>
  );
}