import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Search, MapPin, Star, CheckCircle, AlertCircle, Bike } from 'lucide-react-native';

const RESTAURANTS = [
  {
    id: 1,
    name: 'Green Leaf Kitchen',
    cuisine: 'Healthy Bowls',
    distance: '0.5 mi',
    rating: 4.8,
    safeItems: 12,
    warningItems: 3,
    delivery: ['UberEats', 'DoorDash'],
  },
  {
    id: 2,
    name: 'Ocean Fresh Grill',
    cuisine: 'Seafood',
    distance: '0.8 mi',
    rating: 4.6,
    safeItems: 8,
    warningItems: 5,
    delivery: ['UberEats'],
  },
  {
    id: 3,
    name: 'Vitality Café',
    cuisine: 'Mediterranean',
    distance: '1.2 mi',
    rating: 4.9,
    safeItems: 15,
    warningItems: 2,
    delivery: ['DoorDash', 'GrubHub'],
  },
];

const MENU_ITEMS = [
  {
    name: 'Grilled Salmon Bowl',
    description: 'Wild salmon, quinoa, roasted vegetables',
    price: 16.99,
    calories: 450,
    safetyStatus: 'safe',
  },
  {
    name: 'Mediterranean Chicken Salad',
    description: 'Grilled chicken, mixed greens, feta, olives',
    price: 14.99,
    calories: 380,
    safetyStatus: 'safe',
  },
  {
    name: 'Steak Frites',
    description: 'Sirloin steak with garlic butter, french fries',
    price: 24.99,
    calories: 850,
    safetyStatus: 'caution',
  },
];

export default function EatOutTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Eat Out</Text>
        <Text style={styles.subtitle}>Safe options near you</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or cuisine..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedRestaurant ? (
          <>
            <View style={styles.filterSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterScroll}>
                <TouchableOpacity style={[styles.filterChip, styles.filterChipActive]}>
                  <Text style={[styles.filterText, styles.filterTextActive]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterText}>Healthy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterText}>Mediterranean</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterText}>Asian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterText}>Vegetarian</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
              {RESTAURANTS.map((restaurant) => (
                <TouchableOpacity
                  key={restaurant.id}
                  style={styles.restaurantCard}
                  onPress={() => setSelectedRestaurant(restaurant.id)}>
                  <View style={styles.restaurantHeader}>
                    <View style={styles.restaurantInfo}>
                      <Text style={styles.restaurantName}>{restaurant.name}</Text>
                      <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                    </View>
                    <View style={styles.ratingBadge}>
                      <Star size={14} color="#fbbf24" fill="#fbbf24" />
                      <Text style={styles.ratingText}>{restaurant.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.restaurantMeta}>
                    <View style={styles.metaItem}>
                      <MapPin size={14} color="#6b7280" />
                      <Text style={styles.metaText}>{restaurant.distance}</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.deliveryBadges}>
                      {restaurant.delivery.map((platform) => (
                        <View key={platform} style={styles.deliveryBadge}>
                          <Bike size={12} color="#10b981" />
                          <Text style={styles.deliveryText}>{platform}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.safetyInfo}>
                    <View style={styles.safetyItem}>
                      <CheckCircle size={16} color="#10b981" />
                      <Text style={styles.safetyText}>
                        {restaurant.safeItems} safe items
                      </Text>
                    </View>
                    {restaurant.warningItems > 0 && (
                      <View style={styles.safetyItem}>
                        <AlertCircle size={16} color="#f59e0b" />
                        <Text style={styles.warningText}>
                          {restaurant.warningItems} with caution
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>💡 Dining Tips</Text>
              <Text style={styles.tipsText}>
                • Request dressings and sauces on the side{'\n'}
                • Ask about preparation methods{'\n'}
                • Mention any food allergies or restrictions
              </Text>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedRestaurant(null)}>
              <Text style={styles.backButtonText}>← Back to restaurants</Text>
            </TouchableOpacity>

            <View style={styles.restaurantDetail}>
              <Text style={styles.detailName}>Green Leaf Kitchen</Text>
              <Text style={styles.detailCuisine}>Healthy Bowls • 0.5 mi away</Text>

              <View style={styles.detailStats}>
                <View style={styles.detailStat}>
                  <Star size={20} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.detailStatText}>4.8</Text>
                </View>
                <View style={styles.detailStat}>
                  <CheckCircle size={20} color="#10b981" />
                  <Text style={styles.detailStatText}>12 safe items</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Safe Menu Items</Text>
                <View style={styles.safeBadge}>
                  <CheckCircle size={14} color="#10b981" />
                  <Text style={styles.safeBadgeText}>Personalized</Text>
                </View>
              </View>

              {MENU_ITEMS.map((item) => (
                <View key={item.name} style={styles.menuItemCard}>
                  <View style={styles.menuItemHeader}>
                    <View style={styles.menuItemInfo}>
                      <Text style={styles.menuItemName}>{item.name}</Text>
                      <Text style={styles.menuItemDescription}>
                        {item.description}
                      </Text>
                    </View>
                    {item.safetyStatus === 'safe' ? (
                      <View style={styles.safetyBadgeSafe}>
                        <CheckCircle size={16} color="#10b981" />
                      </View>
                    ) : (
                      <View style={styles.safetyBadgeWarning}>
                        <AlertCircle size={16} color="#f59e0b" />
                      </View>
                    )}
                  </View>

                  <View style={styles.menuItemFooter}>
                    <Text style={styles.menuItemPrice}>${item.price}</Text>
                    <Text style={styles.menuItemCalories}>{item.calories} cal</Text>
                  </View>

                  {item.safetyStatus === 'caution' && (
                    <View style={styles.cautionNote}>
                      <Text style={styles.cautionText}>
                        High sodium - may affect blood pressure
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>Order via UberEats</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
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
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  filterSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterChipActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fffbeb',
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#78350f',
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#6b7280',
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d1d5db',
    marginHorizontal: 8,
  },
  deliveryBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f0fdf4',
    borderRadius: 6,
  },
  deliveryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10b981',
  },
  safetyInfo: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  safetyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981',
  },
  warningText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f59e0b',
  },
  tipsSection: {
    margin: 20,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#1e3a8a',
    lineHeight: 22,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  restaurantDetail: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  detailCuisine: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  detailStats: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 16,
  },
  detailStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailStatText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  safeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
  },
  safeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  menuItemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 12,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
    lineHeight: 18,
  },
  safetyBadgeSafe: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyBadgeWarning: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fffbeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  menuItemCalories: {
    fontSize: 14,
    color: '#6b7280',
  },
  cautionNote: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#fef3c7',
  },
  cautionText: {
    fontSize: 13,
    color: '#92400e',
    fontWeight: '500',
  },
  orderButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
