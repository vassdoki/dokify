import React from 'react';
import { StyleSheet, Text, View, Alert, Image, FlatList } from 'react-native';
import SearchBar from './SearchBar';
import Api from './Api'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            offset: 0,
            limit: 10,
            text: ""
        }
    }
    async searchNext() {
        const token = await Api.getToken();
        const {offset, limit, tracks, text} = this.state;
        const newTracks = await Api.search({token, q:text, offset});
        this.setState({
            tracks: [...tracks, ...newTracks],
            offset: offset + limit,
        });
    }
    async handleSearch(text) {
        this.setState({
            tracks: [],
            offset: 0,
            text,
        }, () => {
            this.searchNext(text);
        });
    }
    render() {
        const { tracks } = this.state;
        return (
            <View style={styles.container}>
                <SearchBar onSearch={this.handleSearch.bind(this)}/>
                <FlatList
                    data={tracks}
                    keyExtractor={(item, index) => item.id}
                    onEndReached={info => {
                        if (tracks.length > 0) {
                            this.searchNext()
                        }
                    }}
                    renderItem={({item}) => <View style={styles.listRow}>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri:item.album.images[0].url}}/>
                        <Text>{item.name}</Text>
                    </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listRow: {
        flexDirection: 'row', // flexbox
        borderWidth: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 20,
        marginTop: 40,
    },
});
