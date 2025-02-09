import { useState } from 'react';
import { Text, TextInput, StyleSheet, Button, View, FlatList, TouchableOpacity, Pressable, Modal, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const [goalText, setGoalText] = useState<string>("");
  const [goals, setGoals] = useState<string[]>([]);
  const [modalon, setModalon] = useState(false);

  function addGoal() {
    if (goalText.trim() === "") {
      return;
    }
    setGoals((currentGoals) => [...currentGoals, goalText]);
    setGoalText("");
    setModalon(false); // Close the modal after adding the goal
  }

  function inputHandle(text: string) {
    setGoalText(text);
  }

  function deleteItem(index: number) {
    const newdata = goals.filter((_, i) => i !== index);
    setGoals(newdata);
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.header}>
        <View style={styles.add}>
          <Button title='Add New Goal' color="#01b06e" onPress={() => setModalon(true)} />
        </View>
        <Modal visible={modalon} animationType="slide">
          <View style={styles.modalContent}>
            <Image style={styles.image} source={require('@/app/(tabs)/img/target.png')} />
            <KeyboardAvoidingView 
              style={styles.keyboardAvoidingView} 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <View style={styles.search}>
                <TextInput
                  style={styles.textInput}
                  placeholder='Enter a Goal'
                  placeholderTextColor='white'
                  value={goalText}
                  onChangeText={inputHandle}
                />
                <Button title='Add Goal' onPress={addGoal} />
              </View>
              <View style={styles.close}>
                <Button title="Close" onPress={() => setModalon(false)} color="#f31282" />
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
        
        <View style={styles.container}>
          <FlatList 
            data={goals}
            renderItem={({ item, index }) => {
              return (
                <Pressable 
                  android_ripple={{ color: '#210466' }}
                  style={({ pressed }) => [
                    styles.goalitem,
                    pressed && { opacity: 0.5 }
                  ]}
                >
                  <Text style={styles.goaltext}>{item}</Text>
                  <TouchableOpacity onPress={() => deleteItem(index)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </Pressable>
              );
            }}
            keyExtractor={(item, index) => index.toString()} // Use index as key
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: "12%",
    flex: 1,
    width: "100%"
  },
  add: {
    width: "80%",
    marginStart: "10%"
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#1A0037',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the top
  },
  keyboardAvoidingView: {
    width: '100%', // Ensure it takes full width
    alignItems: 'center', // Center the content
  },
  search: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "gray",
    paddingBottom: 15,
    width: '100%', // Ensure it takes full width
     // Add some space above the search
  },
  textInput: {
    backgroundColor: '#1A0037',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    width: '77%',
    marginRight: 10,
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#1A0037',
    height: "100%",
    width: "100%",
  },
  goalitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goaltext: {
    color: 'white',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#cc0000',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
  image: {
    width: "63.9%", 
    height: 220, // Set a fixed height for the image
    marginTop: "35%",
    marginBottom:13,
  },
  close: {
    width: "25%",
    height: 40,
    marginVertical: 15,
  },
});