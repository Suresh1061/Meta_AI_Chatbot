import { Text } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

type Props = {
     children: React.ReactNode;
     size?:number,
     color?:string,
     opacity?:number,
     fontWight?:string | number,
     style?: any;
     [key: string]: any; // Allow any other props
};

const CustomText: React.FC<Props> = ({
     children,
     size=RFValue(12),
     color="white",
     opacity=1,
     fontWight="normal",
     style,
     ...props
}) => {
     return (
          <Text style={[{ fontSize: size, color, opacity, fontWeight: fontWight, ...style }, props.style]} {...props}>
               {children}
          </Text>
     );
};

export default CustomText;