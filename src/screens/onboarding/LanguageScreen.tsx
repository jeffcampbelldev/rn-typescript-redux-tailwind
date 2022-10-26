import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tailwind from 'tailwind-rn';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { BBaseScreen, BButton, BImage, BText } from '_app/components';
import { NavigationService } from '_app/services';
import { Colors, CustomStyles, Metrics, useI18n } from '_app/theme';
import { WORLD_LANGUAGES } from '_app/translations/worldLanguages';
import { LANGUAGE } from '_app/types';

const PICKER_HEIGHT = Metrics.windowHeight / 4;

const LanguageScreen = () => {
  const { translations, availableLanguages, changeLanguage } = useI18n();
  const scrollRef = useRef<FlatList>(null);
  const itemHeight = useMemo(() => PICKER_HEIGHT / availableLanguages.length, [availableLanguages]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    changeLanguage(availableLanguages[currentIndex]);
    ReactNativeHapticFeedback.trigger('impactMedium');
  }, [currentIndex, changeLanguage, availableLanguages]);
  const onItemPress = (item: string, index: number) => {
    const offset = index * itemHeight;
    scrollRef.current?.scrollToOffset({ offset, animated: true });
    setCurrentIndex(index);
    changeLanguage(item as LANGUAGE);
    ReactNativeHapticFeedback.trigger('selection');
  };
  const getOffset = (offset: number) => {
    setCurrentIndex(Math.round(Number(offset / itemHeight)));
  };

  return (
    <BBaseScreen hideHeader gradient={false} onBack={() => NavigationService.replace('AuthStack')}>
      <View style={tailwind('flex-1 justify-center items-center')}>
        <View style={[tailwind('items-center justify-end'), { height: Metrics.windowHeight * 0.5 }]}>
          <BImage source={require('_app/assets/images/boltPlus.png')} style={[tailwind('w-3/5 mb-12'), { aspectRatio: 1224 / 502 }]} />
          <BText style={tailwind('font-light mb-8')}>{translations.chooseLanguage}</BText>
        </View>
        <View style={[tailwind('items-center'), { height: Metrics.windowHeight * 0.3 }]}>
          <View style={tailwind('flex-row w-full items-center justify-center')}>
            <View style={tailwind('flex-1 items-center justify-center')}>
              <Icon name="triangle" style={[{ transform: [{ rotate: '90deg' }] }]} color={Colors.PURPLE_RED} size={18} />
            </View>
            <View style={tailwind('flex-1')}>
              <FlatList
                ref={scrollRef}
                horizontal={false}
                pagingEnabled
                style={{ height: PICKER_HEIGHT }}
                contentContainerStyle={{ paddingVertical: itemHeight * 1.5 }}
                snapToInterval={itemHeight}
                decelerationRate={10}
                showsVerticalScrollIndicator={false}
                data={availableLanguages}
                onMomentumScrollEnd={data => getOffset(data.nativeEvent.contentOffset.y)}
                renderItem={({ item, index }) => (
                  <TouchableOpacity key={index} style={[tailwind('justify-center'), { height: itemHeight }]} onPress={() => onItemPress(item, index)}>
                    <BText style={tailwind('text-lg')}>{WORLD_LANGUAGES[item].native}</BText>
                  </TouchableOpacity>
                )}
              />
            </View>
            <LinearGradient
              style={tailwind('absolute inset-0')}
              pointerEvents="box-none"
              colors={[Colors.DARK_PURPLE, Colors.DARK_PURPLE, '#0A0C1F00', '#0A0C1F00', '#0A0C1F00', Colors.DARK_PURPLE, Colors.DARK_PURPLE]}
            />
          </View>
        </View>
        <View style={[tailwind('items-center w-full'), { height: Metrics.windowHeight * 0.2 }]}>
          <LinearGradient style={tailwind('absolute inset-0 opacity-80')} colors={[Colors.DARK_PURPLE, Colors.DARK_PURPLE_1]} />
          <BButton
            style={[tailwind('w-16'), { backgroundColor: Colors.PURPLE }, CustomStyles.aspectRatio1]}
            icon={<Icon name="check" color={Colors.WHITE} size={30} />}
            onPress={() => {
              NavigationService.navigate({ name: 'Interests' });
            }}
          />
        </View>
      </View>
    </BBaseScreen>
  );
};

export default LanguageScreen;
