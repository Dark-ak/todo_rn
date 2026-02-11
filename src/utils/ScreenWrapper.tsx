import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ScreenWrapperProps = {
    children: React.ReactNode
}

const ScreenWrapper = ({children}: ScreenWrapperProps) => {

    const insets = useSafeAreaInsets()

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: '#000',
        }}>

        {children}
        </View>
    )
}

export default ScreenWrapper