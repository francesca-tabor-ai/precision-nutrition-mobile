import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Plus, ShoppingCart, CheckCircle, Circle, Store, DollarSign } from 'lucide-react-native';

const GROCERY_CATEGORIES = [
  {
    name: 'Produce',
    items: [
      { name: 'Spinach', quantity: '2 bunches', price: 3.99, checked: false, aisle: 'Aisle 1' },
      { name: 'Tomatoes', quantity: '1 lb', price: 2.49, checked: true, aisle: 'Aisle 1' },
      { name: 'Avocados', quantity: '3', price: 4.99, checked: false, aisle: 'Aisle 1' },
    ],
  },
  {
    name: 'Protein',
    items: [
      { name: 'Chicken Breast', quantity: '2 lbs', price: 12.99, checked: false, aisle: 'Aisle 8' },
      { name: 'Salmon Fillet', quantity: '1 lb', price: 15.99, checked: false, aisle: 'Aisle 8' },
      { name: 'Greek Yogurt', quantity: '32 oz', price: 5.49, checked: true, aisle: 'Aisle 12' },
    ],
  },
  {
    name: 'Grains',
    items: [
      { name: 'Brown Rice', quantity: '2 lbs', price: 4.99, checked: false, aisle: 'Aisle 5' },
      { name: 'Quinoa', quantity: '1 lb', price: 6.99, checked: false, aisle: 'Aisle 5' },
      { name: 'Whole Wheat Bread', quantity: '1 loaf', price: 3.49, checked: true, aisle: 'Aisle 6' },
    ],
  },
  {
    name: 'Pantry',
    items: [
      { name: 'Olive Oil', quantity: '1 bottle', price: 9.99, checked: false, aisle: 'Aisle 4' },
      { name: 'Almonds', quantity: '1 lb', price: 8.99, checked: false, aisle: 'Aisle 3' },
    ],
  },
];

export default function GroceriesTab() {
  const [items, setItems] = useState(GROCERY_CATEGORIES);

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[categoryIndex].items[itemIndex].checked =
        !newItems[categoryIndex].items[itemIndex].checked;
      return newItems;
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, category) => {
      return (
        total +
        category.items.reduce((sum, item) => {
          return sum + (item.checked ? 0 : item.price);
        }, 0)
      );
    }, 0);
  };

  const getItemsCount = () => {
    const total = items.reduce((sum, category) => sum + category.items.length, 0);
    const checked = items.reduce(
      (sum, category) => sum + category.items.filter((i) => i.checked).length,
      0
    );
    return { total, checked };
  };

  const { total: totalItems, checked: checkedItems } = getItemsCount();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grocery List</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#10b981" />
        </TouchableOpacity>
      </View>

      <View style={styles.storeSelector}>
        <Store size={20} color="#6b7280" />
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>Whole Foods Market</Text>
          <Text style={styles.storeAddress}>0.8 miles away</Text>
        </View>
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {checkedItems} of {totalItems} items
          </Text>
          <Text style={styles.estimatedTotal}>Est. ${getTotalPrice().toFixed(2)}</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(checkedItems / totalItems) * 100}%` },
            ]}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {items.map((category, categoryIndex) => (
          <View key={category.name} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            {category.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.name}
                style={styles.itemCard}
                onPress={() => toggleItem(categoryIndex, itemIndex)}>
                <View style={styles.itemCheckbox}>
                  {item.checked ? (
                    <CheckCircle size={24} color="#10b981" />
                  ) : (
                    <Circle size={24} color="#d1d5db" />
                  )}
                </View>
                <View style={styles.itemInfo}>
                  <Text
                    style={[
                      styles.itemName,
                      item.checked && styles.itemNameChecked,
                    ]}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <Text style={styles.itemAisle}>{item.aisle}</Text>
                </View>
                <View style={styles.itemPriceContainer}>
                  <Text
                    style={[
                      styles.itemPrice,
                      item.checked && styles.itemPriceChecked,
                    ]}>
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsTitle}>Based on your meal plan</Text>
          <View style={styles.suggestionCard}>
            <Text style={styles.suggestionName}>Fresh Basil</Text>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.suggestionCard}>
            <Text style={styles.suggestionName}>Garlic</Text>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <DollarSign size={20} color="#111827" />
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <ShoppingCart size={20} color="#fff" />
          <Text style={styles.checkoutButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  storeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  storeAddress: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  estimatedTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categorySection: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  itemCheckbox: {
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  itemQuantity: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  itemAisle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  itemPriceContainer: {
    marginLeft: 12,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  itemPriceChecked: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  suggestionsSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  suggestionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#78350f',
  },
  suggestionButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#fbbf24',
    borderRadius: 8,
  },
  suggestionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  totalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 8,
    flex: 1,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  checkoutButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
