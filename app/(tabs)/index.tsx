import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { User, Bell, Activity, Apple, ScanBarcode, ShoppingCart } from 'lucide-react-native';

export default function TodayTab() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.subtitle}>Ready for a healthy day?</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <User size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.healthScore}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreTitle}>Today's Health Score</Text>
            <Activity size={20} color="#10b981" />
          </View>
          <Text style={styles.scoreValue}>8.5</Text>
          <Text style={styles.scoreDescription}>Great! You're on track</Text>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreProgress, { width: '85%' }]} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <View style={styles.mealCard}>
            <View style={styles.mealInfo}>
              <Text style={styles.mealType}>Breakfast</Text>
              <Text style={styles.mealName}>Greek Yogurt Bowl</Text>
              <Text style={styles.mealDetails}>350 kcal • 25g protein</Text>
            </View>
            <View style={styles.mealStatus}>
              <Apple size={20} color="#10b981" />
            </View>
          </View>

          <View style={styles.mealCard}>
            <View style={styles.mealInfo}>
              <Text style={styles.mealType}>Lunch</Text>
              <Text style={styles.mealName}>Grilled Chicken Salad</Text>
              <Text style={styles.mealDetails}>450 kcal • 35g protein</Text>
            </View>
            <View style={styles.mealStatus}>
              <View style={styles.pendingDot} />
            </View>
          </View>

          <View style={styles.mealCard}>
            <View style={styles.mealInfo}>
              <Text style={styles.mealType}>Dinner</Text>
              <Text style={styles.mealName}>Salmon with Quinoa</Text>
              <Text style={styles.mealDetails}>520 kcal • 40g protein</Text>
            </View>
            <View style={styles.mealStatus}>
              <View style={styles.pendingDot} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Nudges</Text>
            <Bell size={18} color="#f59e0b" />
          </View>

          <View style={styles.nudgeCard}>
            <View style={styles.nudgeIcon}>
              <Text style={styles.nudgeEmoji}>💧</Text>
            </View>
            <View style={styles.nudgeContent}>
              <Text style={styles.nudgeTitle}>Stay Hydrated</Text>
              <Text style={styles.nudgeText}>You've had 4 of 8 glasses today</Text>
            </View>
          </View>

          <View style={styles.nudgeCard}>
            <View style={styles.nudgeIcon}>
              <Text style={styles.nudgeEmoji}>🥗</Text>
            </View>
            <View style={styles.nudgeContent}>
              <Text style={styles.nudgeTitle}>Prep Tomorrow's Lunch</Text>
              <Text style={styles.nudgeText}>Ingredients are on your grocery list</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <ScanBarcode size={24} color="#10b981" />
              <Text style={styles.actionText}>Scan Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <ShoppingCart size={24} color="#10b981" />
              <Text style={styles.actionText}>View List</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  healthScore: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#10b981',
    marginTop: 12,
  },
  scoreDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  scoreBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  scoreProgress: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    marginRight: 8,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  mealInfo: {
    flex: 1,
  },
  mealType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 4,
  },
  mealDetails: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  mealStatus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#d1d5db',
  },
  nudgeCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  nudgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  nudgeEmoji: {
    fontSize: 24,
  },
  nudgeContent: {
    flex: 1,
  },
  nudgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#78350f',
  },
  nudgeText: {
    fontSize: 13,
    color: '#92400e',
    marginTop: 2,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
});
