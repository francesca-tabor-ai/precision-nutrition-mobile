import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Dog, Plus, Sparkles } from 'lucide-react-native';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

export default function PlanTab() {
  const [planType, setPlanType] = useState<'human' | 'pet'>('human');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Plans</Text>
        <View style={styles.planTypeSelector}>
          <TouchableOpacity
            style={[styles.planTypeButton, planType === 'human' && styles.planTypeButtonActive]}
            onPress={() => setPlanType('human')}>
            <User size={18} color={planType === 'human' ? '#fff' : '#6b7280'} />
            <Text style={[styles.planTypeText, planType === 'human' && styles.planTypeTextActive]}>
              Me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.planTypeButton, planType === 'pet' && styles.planTypeButtonActive]}
            onPress={() => setPlanType('pet')}>
            <Dog size={18} color={planType === 'pet' ? '#fff' : '#6b7280'} />
            <Text style={[styles.planTypeText, planType === 'pet' && styles.planTypeTextActive]}>
              Pets
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekNavigation}>
        <TouchableOpacity style={styles.weekButton}>
          <ChevronLeft size={20} color="#6b7280" />
        </TouchableOpacity>
        <Text style={styles.weekText}>Week of Dec 2 - 8</Text>
        <TouchableOpacity style={styles.weekButton}>
          <ChevronRight size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {planType === 'human' ? (
          <>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>1,850</Text>
                <Text style={styles.statLabel}>Daily Calories</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>130g</Text>
                <Text style={styles.statLabel}>Protein</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>8.2</Text>
                <Text style={styles.statLabel}>Health Score</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>This Week's Plan</Text>
                <TouchableOpacity style={styles.generateButton}>
                  <Sparkles size={16} color="#10b981" />
                  <Text style={styles.generateText}>Regenerate</Text>
                </TouchableOpacity>
              </View>

              {DAYS.map((day, dayIndex) => (
                <View key={day} style={styles.dayCard}>
                  <View style={styles.dayHeader}>
                    <Text style={styles.dayName}>{day}</Text>
                    <Text style={styles.dayDate}>Dec {dayIndex + 2}</Text>
                  </View>
                  {MEAL_TYPES.map((mealType) => (
                    <View key={mealType} style={styles.mealRow}>
                      <View style={styles.mealDot} />
                      <View style={styles.mealContent}>
                        <Text style={styles.mealLabel}>{mealType}</Text>
                        <Text style={styles.mealName}>
                          {getMealName(dayIndex, mealType)}
                        </Text>
                      </View>
                      <Text style={styles.mealCalories}>
                        {getMealCalories(mealType)} cal
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.petSelector}>
              <TouchableOpacity style={styles.addPetButton}>
                <Plus size={20} color="#10b981" />
                <Text style={styles.addPetText}>Add Pet</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.petCard}>
              <View style={styles.petInfo}>
                <View style={styles.petAvatar}>
                  <Text style={styles.petEmoji}>🐕</Text>
                </View>
                <View>
                  <Text style={styles.petName}>Max</Text>
                  <Text style={styles.petDetails}>Golden Retriever • 3 years</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>850</Text>
                <Text style={styles.statLabel}>Daily Calories</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>45g</Text>
                <Text style={styles.statLabel}>Protein</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Max's Meal Plan</Text>
                <TouchableOpacity style={styles.generateButton}>
                  <Sparkles size={16} color="#10b981" />
                  <Text style={styles.generateText}>Regenerate</Text>
                </TouchableOpacity>
              </View>

              {DAYS.map((day, dayIndex) => (
                <View key={day} style={styles.dayCard}>
                  <View style={styles.dayHeader}>
                    <Text style={styles.dayName}>{day}</Text>
                    <Text style={styles.dayDate}>Dec {dayIndex + 2}</Text>
                  </View>
                  <View style={styles.mealRow}>
                    <View style={styles.mealDot} />
                    <View style={styles.mealContent}>
                      <Text style={styles.mealLabel}>Morning</Text>
                      <Text style={styles.mealName}>Chicken & Brown Rice</Text>
                    </View>
                    <Text style={styles.mealCalories}>420 cal</Text>
                  </View>
                  <View style={styles.mealRow}>
                    <View style={styles.mealDot} />
                    <View style={styles.mealContent}>
                      <Text style={styles.mealLabel}>Evening</Text>
                      <Text style={styles.mealName}>Beef & Sweet Potato</Text>
                    </View>
                    <Text style={styles.mealCalories}>430 cal</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function getMealName(dayIndex: number, mealType: string): string {
  const meals = {
    Breakfast: ['Oatmeal Bowl', 'Greek Yogurt Parfait', 'Scrambled Eggs', 'Smoothie Bowl'],
    Lunch: ['Chicken Salad', 'Turkey Wrap', 'Quinoa Bowl', 'Tuna Sandwich'],
    Dinner: ['Grilled Salmon', 'Chicken Stir-fry', 'Beef Tacos', 'Pasta Primavera'],
  };
  return meals[mealType as keyof typeof meals][dayIndex % 4];
}

function getMealCalories(mealType: string): number {
  const calories = {
    Breakfast: 400,
    Lunch: 550,
    Dinner: 650,
  };
  return calories[mealType as keyof typeof calories];
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
    marginBottom: 16,
  },
  planTypeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
  },
  planTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  planTypeButtonActive: {
    backgroundColor: '#10b981',
  },
  planTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  planTypeTextActive: {
    color: '#fff',
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  weekButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  generateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  dayCard: {
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
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dayName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  dayDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  mealDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 12,
  },
  mealContent: {
    flex: 1,
  },
  mealLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mealName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    marginTop: 2,
  },
  mealCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ca3af',
  },
  petSelector: {
    marginTop: 16,
  },
  addPetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#10b981',
    borderStyle: 'dashed',
  },
  addPetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  petEmoji: {
    fontSize: 28,
  },
  petName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  petDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
});
