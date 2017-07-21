import React from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import SearchBar from './SearchBar';
import Api from './Api'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: []
        }
    }
    async handleSearch(text) {
        this.setState({
            tracks: [],
        });
        const token = await Api.getToken();
        const tracks = await Api.search({token, q:text});
        this.setState({
            tracks,
        });
    }
    render() {
        const { tracks } = this.state;
        return (
            <View style={styles.container}>
                <SearchBar onSearch={this.handleSearch.bind(this)}/>
                <View>
                    {
                        tracks.map(track => {
                            console.log(track.album.images[0]);
                            return <View>
                                <Text key={track.name}>{track.name}</Text>
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={{uri:track.album.images[0].url}}/>
                            </View>
                        })
                    }
                </View>
                {/*<Text>Open up App.js to start working on your app!</Text>*/}
                {/*<Text>Changes you make will automatically reload.</Text>*/}
                {/*<Text>Shake your phone to open the developer menu.</Text>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 20,
        marginTop: 40,
    },
});
