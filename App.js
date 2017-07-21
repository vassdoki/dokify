import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import SearchBar from './SearchBar';
import Api from './Api'

export default class App extends React.Component {
    async handleSearch(text) {
        Alert.alert(text, await Api.getToken());
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchBar onSearch={this.handleSearch.bind(this)}/>
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
