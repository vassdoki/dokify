import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';

class TrackItem extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity style={styles.item} onPress={this.props.onPress.bind(this, item)}>
                <Image
                    style={styles.image}
                    source={{uri: item.album.images[0].url}}/>
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 10,
    },
    text: {
        marginLeft: 10,
    },
    image: {
        width: 50,
        height: 50,
    }
});

export default TrackItem;