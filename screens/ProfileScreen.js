import React from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Br from '../components/widgets/br/br';
import { Rating } from 'react-native-elements';
import { colors } from '../assets/styles/colors';

const tags = ['ios', 'android', 'web', 'ui', 'ux'];

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

export default function Profile({ user }) {
  const performance = user.performance || 0.3;
  const revenuSatus = user.revenuSatus || 0.9;

  const getStatusColor = (status) => {
    if (status <= 0.3) {
      return 'red';
    } else if (status > 0.3 && status < 0.5) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  const items = [
    {
      icon: 'figma',
      label: 'Niveau de performance',
      render: (
        <ProgressBar
          progress={performance}
          color={getStatusColor(performance)}
          style={{ backgroundColor: '#eff1f5', height: 10, borderRadius: 5 }}
        />
      ),
    },
    {
      icon: 'star',
      label: 'Ma note globale',
      render: <Rating startingValue={5} readonly imageSize={15} />,
    },
    {
      icon: 'user',
      label: 'Niveau de revenus',
      render: (
        <ProgressBar
          progress={revenuSatus}
          color={getStatusColor(revenuSatus)}
          style={{ backgroundColor: '#eff1f5', height: 10, borderRadius: 5 }}
        />
      ),
    },
  ];

  const stats = [
    { label: 'Ville', value: user?.ville },
    { label: 'Quartier', value: user?.quartier },
    { label: 'Experience', value: '6 years' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.profile}>
              <View style={styles.profileTop}>
                <View style={styles.avatar}>
                  <Image
                    alt=""
                    source={{
                      uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                    }}
                    style={styles.avatarImg}
                  />

                  <View style={styles.avatarNotification} />
                </View>

                <View style={styles.profileBody}>
                  <Text style={styles.profileTitle}>{user.nom}</Text>

                  <Text style={styles.profileSubtitle}>
                    chauffeur
                    {' · '}
                    <Text style={{ color: '#266EF1' }}>{user?.email}</Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.stats}>
              {stats.map(({ label, value }, index) => (
                <View
                  key={index}
                  style={[
                    styles.statsItem,
                    index === 0 && { borderLeftWidth: 0 },
                  ]}
                >
                  <Text style={styles.statsItemText}>{label}</Text>
                  <Text style={styles.statsItemValue}>{value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.contentActions}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={{ flex: 1, paddingHorizontal: 6 }}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Signaler un problème</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={{ flex: 1, paddingHorizontal: 6 }}
              >
                <View style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>Réclamer mon paiement</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}></Text>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              ></TouchableOpacity>
            </View>
          </View>

          <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Satuts du travail</Text>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              ></TouchableOpacity>
            </View>

            <View
              contentContainerStyle={styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {items.map(({ icon, label, render }, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // handle onPress
                  }}
                >
                  <View style={styles.card}>
                    <View style={styles.cardTop}>
                      <View style={styles.cardIcon}>
                        <FeatherIcon color="#000" name={icon} size={24} />
                      </View>

                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{label}</Text>
                        <Br size={10} />
                        {render}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  
  content: {
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  contentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginHorizontal: -6,
    marginBottom: 0,
  },
  /** Profile */
  profile: {
    paddingTop: 4,
    paddingBottom: 16,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#778599',
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  profileTags: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
  },
  /** Avatar */
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  /** Stats */
  stats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: 'rgba(189, 189, 189, 0.32)',
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#778599',
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#121a26',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor:colors.primary,
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#fff',
  },
  /** List */
  list: {
    marginTop: 16,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#778599',
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  /** Card */
  card: {
    width: CARD_WIDTH,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18,
    color: '#121a26',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
});
