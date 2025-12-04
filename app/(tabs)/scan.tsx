import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Camera, Search, History, AlertCircle, CheckCircle, XCircle } from 'lucide-react-native';

export default function ScanTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Food Scanner</Text>
        <Text style={styles.subtitle}>Can I eat this?</Text>
      </View>

      <View style={styles.scanSection}>
        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={32} color="#fff" />
          <Text style={styles.cameraButtonText}>Scan Barcode</Text>
        </TouchableOpacity>

        <View style={styles.orDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search food by name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {showResults && searchQuery ? (
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>Analysis Results</Text>

            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.foodName}>{searchQuery}</Text>
                <View style={[styles.safetyBadge, styles.safetyBadgeWarning]}>
                  <AlertCircle size={16} color="#f59e0b" />
                  <Text style={styles.safetyBadgeText}>Caution</Text>
                </View>
              </View>

              <View style={styles.scoreSection}>
                <View style={styles.scoreCircle}>
                  <Text style={styles.scoreValue}>6.5</Text>
                  <Text style={styles.scoreLabel}>Safety Score</Text>
                </View>
              </View>

              <View style={styles.analysisSection}>
                <View style={styles.analysisItem}>
                  <CheckCircle size={18} color="#10b981" />
                  <View style={styles.analysisContent}>
                    <Text style={styles.analysisTitle}>Benefits</Text>
                    <Text style={styles.analysisText}>High in protein and omega-3 fatty acids</Text>
                  </View>
                </View>

                <View style={styles.analysisItem}>
                  <AlertCircle size={18} color="#f59e0b" />
                  <View style={styles.analysisContent}>
                    <Text style={styles.analysisTitle}>Caution</Text>
                    <Text style={styles.analysisText}>
                      May interact with your blood pressure medication (Lisinopril)
                    </Text>
                  </View>
                </View>

                <View style={styles.analysisItem}>
                  <XCircle size={18} color="#ef4444" />
                  <View style={styles.analysisContent}>
                    <Text style={styles.analysisTitle}>Warning</Text>
                    <Text style={styles.analysisText}>
                      High sodium content - limit portion to 1 serving
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.nutritionSection}>
                <Text style={styles.nutritionTitle}>Nutrition Info (per serving)</Text>
                <View style={styles.nutritionGrid}>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>250</Text>
                    <Text style={styles.nutritionLabel}>Calories</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>12g</Text>
                    <Text style={styles.nutritionLabel}>Protein</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>18g</Text>
                    <Text style={styles.nutritionLabel}>Fat</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>8g</Text>
                    <Text style={styles.nutritionLabel}>Carbs</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Full Ingredients</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.historySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Scans</Text>
              <History size={18} color="#6b7280" />
            </View>

            <View style={styles.historyCard}>
              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>Grilled Salmon</Text>
                <Text style={styles.historyTime}>Today at 2:30 PM</Text>
              </View>
              <View style={[styles.historyBadge, styles.historyBadgeSafe]}>
                <CheckCircle size={16} color="#10b981" />
                <Text style={styles.historyBadgeText}>Safe</Text>
              </View>
            </View>

            <View style={styles.historyCard}>
              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>Cheddar Cheese</Text>
                <Text style={styles.historyTime}>Yesterday at 11:45 AM</Text>
              </View>
              <View style={[styles.historyBadge, styles.historyBadgeWarning]}>
                <AlertCircle size={16} color="#f59e0b" />
                <Text style={styles.historyBadgeText}>Caution</Text>
              </View>
            </View>

            <View style={styles.historyCard}>
              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>Grapefruit Juice</Text>
                <Text style={styles.historyTime}>Dec 1 at 8:20 AM</Text>
              </View>
              <View style={[styles.historyBadge, styles.historyBadgeAvoid]}>
                <XCircle size={16} color="#ef4444" />
                <Text style={styles.historyBadgeText}>Avoid</Text>
              </View>
            </View>

            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>💡 Pro Tip</Text>
              <Text style={styles.tipsText}>
                Scan foods before purchasing to ensure they're compatible with your health profile and medications.
              </Text>
            </View>
          </View>
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
  scanSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  cameraButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cameraButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 12,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  orText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ca3af',
    marginHorizontal: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  foodName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  safetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  safetyBadgeSafe: {
    backgroundColor: '#f0fdf4',
  },
  safetyBadgeWarning: {
    backgroundColor: '#fffbeb',
  },
  safetyBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
  },
  scoreSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fffbeb',
    borderWidth: 8,
    borderColor: '#fde68a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#f59e0b',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#92400e',
    marginTop: 4,
  },
  analysisSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  analysisItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  analysisContent: {
    flex: 1,
    marginLeft: 12,
  },
  analysisTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  analysisText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  nutritionSection: {
    paddingVertical: 20,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  detailsButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  historySection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  historyCard: {
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
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  historyTime: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 4,
  },
  historyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  historyBadgeSafe: {
    backgroundColor: '#f0fdf4',
  },
  historyBadgeWarning: {
    backgroundColor: '#fffbeb',
  },
  historyBadgeAvoid: {
    backgroundColor: '#fef2f2',
  },
  historyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
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
    lineHeight: 20,
  },
});
