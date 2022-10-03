import React from 'react'
import { Text, View, Pressable } from 'react-native';
import { useState, useEffect } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { Col, Grid } from 'react-native-easy-grid'

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const BONUS_MULTIPLIER = 0.1;
const NBRS = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
]

export default function GameBoard() {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [buttonText, setButtonText] = useState('Throw dices...');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false))
    const [values, setValues] = useState([])
    const [sum, setSum] = useState(new Array(6).fill(0))
    const [total, setTotal] = useState(0)
    const [selectedDicesPoints, setSelectedDicesPoints] = useState(new Array(6).fill(false))
    const [bonusPoints, setBonusPoints] = useState(63)
    const [bonusMessage, setBonusMessage] = useState('You are ' + { bonusPoints } + ' points from bonus')
    const [bonusStatus,setBonusStatus] = useState(false)

    //funktiot

    //noppien värin vaihto

    const getDiceColor = (i) => {
        return selectedDices[i] ? '#565656' : '#274060'
    }

    // pisteiden värien vaihto samalla tyylillä kuin edellä
    const getPointColor = (i) => {
        return selectedDicesPoints[i] ? '#565656' : '#274060'
    }
    // valitaan lukittavat nopat
    const selectDice = (i) => {
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('You have to throw dices first')
            return
        }
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true
        setSelectedDices(dices)
    }
    // asetetaan pisteet ja käsitellään epätavalliset tilanteet
    const selectPoints = (i) => {
        if (nbrOfThrowsLeft > 0) {
            setStatus('Throw 3 times before setting points')
            return
        }
        if (selectedDicesPoints[i] === true) {
            setStatus('You already selected points for ' + (i + 1))
            return
        }

        let points = [...selectedDicesPoints]
        let dicePoints = [...sum]
        points[i] = selectedDicesPoints[i] ? false : true
        let sum1 = 0
        for (let j = 0; j < values.length; j++) {
            if (NBRS[i].value == values[j]) {
                sum1 = sum1 + values[j]
            }
        }

        dicePoints[i] = sum1
        setSelectedDicesPoints(points)
        setSum(dicePoints)
        let sumDicePoints = dicePoints.reduce((a, b) => a + b, 0)
        setTotal
            (sumDicePoints)
        setBonusPoints(63 - sumDicePoints)
        setSelectedDices(new Array(6).fill(false))
        setNbrOfThrowsLeft(3)
    }

    //heitä nopat
    const throwDices = () => {
        let dices = [...values]
        if (selectedDicesPoints.every(value => value === true)) {
            newGame()
            
        }
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points before your next throw')
            return
        }
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                dices[i] = randomNumber
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        setValues(dices)
    }
    //bonustilanteen ja voiton tarkistus
    const checkBonusPoints = () => {
        setBonusMessage('You are ' + bonusPoints + ' points from bonus')
        if (selectedDicesPoints.every(value => value === true)) {
            setStatus('Game over. All points selected')
            if (bonusStatus == true) {
                let newTotal = total + total * BONUS_MULTIPLIER
                setTotal(newTotal)
                setStatus('Well done! You got a bonus, your final points are ' + total + ' ' + BONUS_MULTIPLIER + ' * ' + total + ' = ' + newTotal)
            }
            setNbrOfThrowsLeft(0)
            setButtonText('Start a new game')
        }
        if (total >= 63) {
            setBonusMessage('You got the bonus multiplier!')
            setBonusStatus(true)
        }
    }

    //uusi peli, alustetaan tilamuuttujat

    const newGame = () => {
        setNbrOfThrowsLeft(NBR_OF_THROWS)
        setStatus('')
        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        setSelectedDicesPoints(new Array(6).fill(false))
        setValues([])
        setSum(new Array(6).fill(0))
        setTotal(0)
        setBonusPoints(63)
        setBonusMessage('You are ' + { bonusPoints } + ' points from bonus')
        setButtonText('Throw dices...')
        setBonusStatus(false)
        board = []
    }

    //nopat
    const diceRow = []
    for (let i = 0; i < NBR_OF_DICES; i++) {
        diceRow.push(
            <Pressable
                key={"diceRow" + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"diceRow" + i}
                    size={50}
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        )
    }
    //pisteet ja numerot
    const pointsRow = []
    for (let i = 0; i < NBRS.length; i++) {
        pointsRow.push(
            <View key={'rowPoints' + i} style={styles.grid}>
                <Text style={styles.container}>{sum[i]}</Text>
                <Grid style={styles.grid}>
                    <Col size={80}>
                        <Pressable
                            key={"numbersRow" + i}
                            onPress={() => selectPoints(i)}>
                            <MaterialCommunityIcons
                                name={["numeric-" + (i + 1) + "-box"]}
                                size={50}
                                color={getPointColor(i)}>
                            </MaterialCommunityIcons>
                        </Pressable>
                    </Col>
                </Grid>
            </View>
        )
    }

    //Päivitetään status teksti ja katsotaan bonustilanne
    useEffect(() => {
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices...')
        }
        if (nbrOfThrowsLeft > 0 && nbrOfThrowsLeft < NBR_OF_THROWS) {
            setStatus('Select and throw dices again')
        }
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points');
        }
        checkBonusPoints()
    }, [nbrOfThrowsLeft])

    //renderöinti

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{diceRow}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                <Text style={styles.buttonText}>
                    {buttonText}
                </Text>
            </Pressable>
            <Text style={styles.totalText}>Total points: {total} </Text>
            {bonusStatus == true ? 
            <Text style={styles.bonusWinText}>{bonusMessage}</Text>
            :
            <Text style={styles.bonusText}>{bonusMessage}</Text>
            }
            <View><Text>{pointsRow}</Text></View>
        </View>
    )

}
