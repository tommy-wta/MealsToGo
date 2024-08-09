import React from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { useContext } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { View } from "react-native";
import { List, Avatar } from "react-native-paper";
import { styled } from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../infrastructure/navigation/settings.navigator";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

type SettingsScreenProps = StackScreenProps<RootStackParamList, "SettingsBase">;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
  padding-top: 25px;
`;

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  const { onLogout, user } = useContext(AuthenticationContext);

  return (
    <>
      <SafeArea>
        <View style={{ flex: 1 }}>
          <AvatarContainer>
            <Avatar.Icon
              size={180}
              icon="human"
              style={{ backgroundColor: "#2182BD" }}
            />
            <Spacer position="top" size="large">
              <Text variant="label">{user ? user.email : "Guest"}</Text>
            </Spacer>
          </AvatarContainer>
          <List.Section>
            <SettingsItem
              title="Favourites"
              description="View your favourites"
              left={(props) => (
                <List.Icon {...props} color="black" icon="heart" />
              )}
              onPress={() => navigation.navigate("Favorites")}
            />
            <SettingsItem
              title="Logout"
              left={(props) => (
                <List.Icon {...props} color="black" icon="door" />
              )}
              onPress={onLogout}
            />
          </List.Section>
        </View>
      </SafeArea>
    </>
  );
};
