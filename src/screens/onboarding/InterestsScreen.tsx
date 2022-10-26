import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tailwind from 'tailwind-rn';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { BBaseScreen, BButton, BImage, BText } from '_app/components';
import { Constants } from '_app/config';
import { NavigationService } from '_app/services';
import { Colors, CustomStyles, Metrics, useI18n } from '_app/theme';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAction } from '_app/store/auth/actions';
import { authSelector } from '_app/store/auth/selector';

const InterestsScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(authSelector);
  const { translations, language } = useI18n();
  const [selected, setSelected] = useState<Array<string>>([]);

  const renderItem = useCallback(
    (value: string) => (
      <BButton
        key={value}
        style={tailwind('flex-grow py-1 m-3 px-4 bg-white')}
        // activeOpacity={1}
        label={value}
        labelStyle={tailwind(`capitalize ${!selected.includes(value) ? 'text-black' : ''}`)}
        gradient={selected.includes(value)}
        onPress={() => {
          ReactNativeHapticFeedback.trigger('impactMedium');
          setSelected(selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value]);
        }}
      />
    ),
    [selected],
  );

  const onSubmit = () => {
    dispatch(updateProfileAction({ language, interests: selected }));
  };

  const submitDisabled = selected.length < 3;

  return (
    <BBaseScreen hideHeader gradient={false} loading={loading} onBack={() => NavigationService.replace('AuthStack')}>
      <View style={tailwind('flex-1 justify-center items-center')}>
        <View style={[tailwind('items-center justify-end'), { height: Metrics.windowHeight * 0.4 }]}>
          <BImage source={require('_app/assets/images/boltPlus.png')} style={[tailwind('w-3/5 mb-12'), { aspectRatio: 1224 / 502 }]} />
          <BText style={tailwind('font-light mb-8')}>{translations.chooseInterests}</BText>
        </View>
        <View style={[tailwind('items-center justify-center flex-row'), { height: Metrics.windowHeight * 0.4 }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={tailwind('h-full px-8')}
          >
            <View style={tailwind('justify-around')}>
              <View style={tailwind('flex-row')}>{Constants.TOPICS.slice(0, 6).map(item => renderItem(item))}</View>
              <View style={tailwind('flex-row')}>{Constants.TOPICS.slice(6, 12).map(item => renderItem(item))}</View>
              <View style={tailwind('flex-row')}>{Constants.TOPICS.slice(12, 16).map(item => renderItem(item))}</View>
              <View style={tailwind('flex-row')}>{Constants.TOPICS.slice(16).map(item => renderItem(item))}</View>
            </View>
          </ScrollView>
        </View>
        <View style={[tailwind('items-center w-full'), { height: Metrics.windowHeight * 0.2 }]}>
          <LinearGradient style={tailwind('absolute inset-0 opacity-80')} colors={[Colors.DARK_PURPLE, Colors.DARK_PURPLE_1]} />
          <BButton
            style={[tailwind('w-16'), { backgroundColor: Colors.PURPLE }, CustomStyles.aspectRatio1, submitDisabled && tailwind('hidden')]}
            icon={<Icon name="check" color={Colors.WHITE} size={30} />}
            disabled={submitDisabled}
            onPress={onSubmit}
          />
        </View>
      </View>
    </BBaseScreen>
  );
};

export default InterestsScreen;
