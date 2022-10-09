function Box1 () {
    Robot_Start()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Left()
    TracJC()
    Kick()
}
function Turn_Right () {
    MotorStop()
    MyRobotBit.RotateNOTIME(Turn.Right, 50)
    basic.pause(220)
    MotorStop()
}
function MotorStop () {
    MyRobotBit.motorOFF(motorSEL.M12, StopMode.Brake)
    basic.pause(100)
}
function Forward () {
    MyRobotBit.MotorAB(motorDIR.Forward, 50, 50)
}
function Trac_ms () {
    Start = input.runningTime()
    Timer = 0
    while (Timer < Trac_Time) {
        Trac_PID()
        basic.pause(Kt)
        Timer = input.runningTime() - Start
        Cal_Error()
    }
}
function Trac_ms_Speed () {
    Base_Speed = ACC_Speed
    Trac_ms()
    Base_Speed = Speed
}
input.onButtonPressed(Button.A, function () {
    Box1()
    Box2()
    Box3()
    Box4()
    GoStart()
    Finish()
})
function UTurn () {
    MotorStop()
    MyRobotBit.followlineTurn(Turn.Right, 40)
    basic.pause(425)
    MotorStop()
}
function TracJC_Slow_Stop () {
    Base_Speed = Slow_Speed
    TracJC()
    Base_Speed = Speed
}
function Turn_Left () {
    MotorStop()
    MyRobotBit.RotateNOTIME(Turn.Left, 50)
    basic.pause(250)
    MotorStop()
}
function Finish () {
    MyRobotBit.motorOFF(motorSEL.M12, StopMode.Brake)
    basic.showString("Finish")
    while (true) {
    	
    }
}
function Box4 () {
    Backward()
    basic.pause(200)
    UTurn()
    TracJC()
    Kick()
}
function GoStart () {
    Backward()
    basic.pause(400)
    Turn_Left()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Left()
    TracJC()
    Turn_Left()
    Trac_Time = 1000
    Trac_ms()
    Turn_Right()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Left()
    TracJC()
    Turn_Left()
    TracJC()
    Turn_Left()
    Trac_Time = 1600
    Trac_ms()
}
function TracJC () {
    Cal_Error()
    while (error < 100) {
        Trac_PID()
        Start = input.runningTime()
        Timer = 0
        while (Timer < Kt && error != 100) {
            Timer = input.runningTime() - Start
            Cal_Error()
        }
    }
}
function Read5ADC () {
    ค่าแสงP0 = MySensor.analogRead(MySensor.analogPort.P0)
    ค่าแสงP1 = MySensor.analogRead(MySensor.analogPort.P1)
    ค่าแสงp2 = MySensor.analogRead(MySensor.analogPort.P2)
    ค่าแสงP3 = MySensor.analogRead(MySensor.analogPort.P3)
    ค่าแสงP4 = MySensor.analogRead(MySensor.analogPort.P4)
}
function Trac_PID () {
    Initial_Speed()
    Output = Kp * error + (Ki * Sum_error + Kd * (error - Pre_error))
    Left_Speed = Base_Left_Speed + Output
    Right_Speed = Base_Right_Speed - Output
    if (Left_Speed > 0) {
        if (Left_Speed > Max_Speed) {
            Left_Speed = Max_Speed
        }
        iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Forward, Left_Speed)
    } else {
        if (Math.abs(Left_Speed) > Max_Speed) {
            Left_Speed = Max_Speed
        }
        iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Backward, Math.abs(Left_Speed))
    }
    if (Right_Speed > 0) {
        if (Right_Speed > Max_Speed) {
            Right_Speed = Max_Speed
        }
        iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Forward, Right_Speed)
    } else {
        if (Math.abs(Right_Speed) > Max_Speed) {
            Right_Speed = Max_Speed
        }
        iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Backward, Math.abs(Right_Speed))
    }
    Pre_error = error
    Sum_error += error
}
input.onButtonPressed(Button.B, function () {
    Show5ADC()
})
function Robot_Start () {
    Forward()
    basic.pause(500)
}
function Box3 () {
    Backward()
    basic.pause(400)
    Turn_Right()
    Trac_Time = 1000
    Trac_ms()
    Turn_Right()
    TracJC()
    Turn_Right()
    TracJC()
    Kick()
}
function Kick () {
    MyRobotBit.motorOFF(motorSEL.M12, StopMode.Brake)
    MyServo.ServoRun(Servo.Servo0, 90)
    basic.pause(300)
    MyServo.ServoRun(Servo.Servo0, 90)
}
function Cal_Error () {
    Read5ADC()
    if (ค่าแสงP1 > Ref_P1 && (ค่าแสงP0 < Ref_P0 && (ค่าแสงP3 > Ref_P2 && (ค่าแสงP4 > Ref_P3 && ค่าแสงP4 > Ref_P4)))) {
        error = 3
    } else {
        if (ค่าแสงP1 < Ref_P1 && (ค่าแสงP0 < Ref_P0 && (ค่าแสงP3 > Ref_P2 && (ค่าแสงP4 > Ref_P3 && ค่าแสงP4 > Ref_P4)))) {
            error = 2
        } else {
            if (ค่าแสงP1 < Ref_P1 && (ค่าแสงP0 > Ref_P0 && (ค่าแสงP3 > Ref_P2 && (ค่าแสงP4 > Ref_P3 && ค่าแสงP4 > Ref_P4)))) {
                error = 1
            } else {
                if (ค่าแสงP1 > Ref_P1 && (ค่าแสงP0 > Ref_P0 && (ค่าแสงP3 > Ref_P2 && (ค่าแสงP4 > Ref_P3 && ค่าแสงP4 > Ref_P4)))) {
                    error = 0
                } else {
                    if (ค่าแสงP1 > Ref_P1 && (ค่าแสงP0 > Ref_P0 && (ค่าแสงP3 > Ref_P2 && (ค่าแสงP4 > Ref_P3 && ค่าแสงP4 < Ref_P4)))) {
                        error = -1
                    } else {
                        if (ค่าแสงP1 > Ref_P1 && (ค่าแสงP0 > Ref_P0 && (ค่าแสงP3 > Ref_P2 && (ค่าแสงP4 < Ref_P3 && ค่าแสงP4 < Ref_P4)))) {
                            error = -2
                        } else {
                            if (ค่าแสงP1 > Ref_P1 && (ค่าแสงP0 > Ref_P0 && (ค่าแสงP3 > Ref_P2 && (ค่าแสงP4 < Ref_P3 && ค่าแสงP4 > Ref_P4)))) {
                                error = -3
                            } else {
                                if (ค่าแสงP3 < Ref_P2) {
                                    error = 100
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function Box2 () {
    Backward()
    basic.pause(400)
    Turn_Left()
    Trac_Time = 1000
    Trac_ms()
    Turn_Left()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Right()
    TracJC()
    Kick()
}
function Initial_Speed () {
    Base_Left_Speed = Base_Speed - 0
    Base_Right_Speed = Base_Speed - 1
    Max_Speed = Base_Speed
}
function Show5ADC () {
    Read5ADC()
    basic.showNumber(ค่าแสงP0)
    basic.pause(1000)
    basic.showNumber(ค่าแสงP1)
    basic.pause(1000)
    basic.showNumber(ค่าแสงp2)
    basic.pause(1000)
    basic.showNumber(ค่าแสงP3)
    basic.pause(1000)
    basic.showNumber(ค่าแสงP4)
}
function Backward () {
    MyRobotBit.MotorAB(motorDIR.Reverse, 50, 50)
}
let Max_Speed = 0
let Base_Right_Speed = 0
let Right_Speed = 0
let Base_Left_Speed = 0
let Left_Speed = 0
let Pre_error = 0
let Sum_error = 0
let Output = 0
let ค่าแสงP4 = 0
let ค่าแสงP3 = 0
let ค่าแสงp2 = 0
let ค่าแสงP1 = 0
let ค่าแสงP0 = 0
let error = 0
let Trac_Time = 0
let Timer = 0
let Start = 0
let Ref_P4 = 0
let Ref_P3 = 0
let Ref_P2 = 0
let Ref_P0 = 0
let Ref_P1 = 0
let Kt = 0
let Ki = 0
let Kd = 0
let Kp = 0
let Base_Speed = 0
let Slow_Speed = 0
let ACC_Speed = 0
let Speed = 0
Speed = 60
ACC_Speed = 80
Slow_Speed = 50
Base_Speed = Speed
let Turn_Speed = 60
Initial_Speed()
Kp = 50
Kd = 100
Ki = 0
Kt = 10
Ref_P1 = 2500
Ref_P0 = 2500
Ref_P2 = 2500
Ref_P3 = 2500
Ref_P4 = 2500
Kick()
basic.showIcon(IconNames.No)
