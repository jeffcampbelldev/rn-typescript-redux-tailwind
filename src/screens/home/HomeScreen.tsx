import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Video from 'react-native-video';
import tailwind from 'tailwind-rn';
import { BBaseScreen, HomeHeader, LoadingView } from '_app/components';
const tempUrl = 'https://streamorigin.bolt.global/coinscrumchannel/Coinscrum/playlist.m3u8';
const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  return (
    <BBaseScreen gradient={true} hideHeader>
      <HomeHeader />
      <ScrollView contentContainerStyle={tailwind('justify-end items-center')}>
        <View style={[tailwind('w-full border border-gray-500 rounded-md overflow-hidden'), { aspectRatio: 16 / 9 }]}>
          <Video
            source={{
              uri: tempUrl,
            }}
            style={[tailwind('w-full h-full')]}
            controls
            paused
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
          <LoadingView loading={loading} indicatorSize="small" />
        </View>
      </ScrollView>
    </BBaseScreen>
  );
};

export default HomeScreen;
