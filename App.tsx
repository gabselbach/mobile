import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import NLWLogo from './src/assets/nlw-spacetime-logo.svg'
import { styled } from 'nativewind';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/4593b300fa29a95246b9',
};
const StyleStripes = styled(Stripes)
export default function App() {
  const [request, response, signInWithGithub] = useAuthRequest(
    
    {
      clientId: '4593b300fa29a95246b9',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'spacetime'
      }),
    },
    discovery
  );

  const [ hasLoadedFonts ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })
  if(!hasLoadedFonts) {
    return null
  }
  useEffect(() => {
    // console.log(
    //   'response',
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params

     console.log(code)
    }
  }, [response]);


  return (

    <ImageBackground source={blurBg} className=" px-8 py-4 flex-1 relative items-center bg-gray-900 " imageStyle= { {position: 'absolute', left: '-100%'}}>
      <StyleStripes className="absolute left-2"/>
      <StatusBar style="light" translucent />
      <View className="flex-1 items-center justify-center gap-6">
      <NLWLogo/>
      <View className="space-y-2">
      <Text className="text-center font-title text-2xl leading-tight text-gray-50">Sua cápsula do tempo</Text>
      <Text className="text-center font-body text-base leading-relaxed text-gray-100">Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
      </View>
      <TouchableOpacity
          onPress={() => signInWithGithub}
          activeOpacity={0.7}
          className="rounded-full bg-green-400 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </ImageBackground>
  );
}
