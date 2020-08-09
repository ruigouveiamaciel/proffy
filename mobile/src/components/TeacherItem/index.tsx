import React from "react";

import styles from "./styles"
import { View, Image, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png"
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png"
import whatsappIcon from "../../assets/images/icons/whatsapp.png"

function TeacherItem() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: "https://github.com/ruigouveiamaciel.png" }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Rui Maciel</Text>
                    <Text style={styles.subject}>Quimica</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, eveniet fuga maxime dolore ipsa, dolorum beatae nihil quaerat quae vitae optio obcaecati magnam quos, pariatur corrupti hic! Vero voluptatem architecto quidem officia maiores blanditiis, beatae dolore nobis sequi fuga esse.
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {"   "}
                    <Text style={styles.priceValue}>
                        $80,00
                    </Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                        {/*<Image source={heartOutlineIcon} />*/}
                        <Image source={unfavoriteIcon} />
                    </RectButton>
                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>
                            Entrar em contacto
                        </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;