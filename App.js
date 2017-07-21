import React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, ActivityIndicator } from 'react-native';
import SearchBar from './SearchBar';
import Api from './Api'
import TrackItem from './TrackItem'
import {Audio} from 'expo';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            offset: 0,
            limit: 10,
            text: ""
        };
        this.soundObject = new Audio.Sound();
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
    async playAudio(item) {
        if (item.preview_url) {
            try {
                await this.soundObject.stopAsync();
                await this.soundObject.unloadAsync();
            } catch(e) {
            }
            try {
                await this.soundObject.loadAsync({uri:item.preview_url});
                await this.soundObject.playAsync();
            } catch(e) {
                Alert.alert("Opps!", e);
            }
        } else {
            Alert.alert("Opps!", "No preview available")
        }
    }
    render() {
        const { tracks, text } = this.state;
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
                    renderItem={({item}) => <TrackItem item={item} onPress={this.playAudio.bind(this)}/> }
                    ListEmptyComponent={
                        !text
                            ? <Text>Használd a keresést!</Text>
                            : <ActivityIndicator/>
                    }
                    ItemSeparatorComponent={
                        () => <View style={styles.separator}/>
                    }
                    // onRefresh={}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 40,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgb(200,200,200)',
    }
});
