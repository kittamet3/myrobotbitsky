def Box1():
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
def Turn_Right():
    MotorStop()
    MyRobotBit.rotate_notime(Turn.RIGHT, 50)
    basic.pause(220)
    MotorStop()
def MotorStop():
    MyRobotBit.motor_off(motorSEL.M12, StopMode.BRAKE)
    basic.pause(100)
def Forward():
    MyRobotBit.motor_ab(motorDIR.FORWARD, 50, 50)
def Trac_ms():
    global Start, Timer
    Start = input.running_time()
    Timer = 0
    while Timer < Trac_Time:
        Trac_PID()
        basic.pause(Kt)
        Timer = input.running_time() - Start
        Cal_Error()
def Trac_ms_Speed():
    global Base_Speed
    Base_Speed = ACC_Speed
    Trac_ms()
    Base_Speed = Speed

def on_button_pressed_a():
    Box1()
    Box2()
    Box3()
    Box4()
    GoStart()
    Finish()
input.on_button_pressed(Button.A, on_button_pressed_a)

def UTurn():
    MotorStop()
    MyRobotBit.followline_turn(Turn.RIGHT, 40)
    basic.pause(425)
    MotorStop()
def TracJC_Slow_Stop():
    global Base_Speed
    Base_Speed = Slow_Speed
    TracJC()
    Base_Speed = Speed
def Turn_Left():
    MotorStop()
    MyRobotBit.rotate_notime(Turn.LEFT, 50)
    basic.pause(250)
    MotorStop()
def Finish():
    MyRobotBit.motor_off(motorSEL.M12, StopMode.BRAKE)
    basic.show_string("Finish")
    while True:
        pass
def Box4():
    Backward()
    basic.pause(200)
    UTurn()
    TracJC()
    Kick()
def GoStart():
    global Trac_Time
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
def TracJC():
    global Start, Timer
    Cal_Error()
    while error < 100:
        Trac_PID()
        Start = input.running_time()
        Timer = 0
        while Timer < Kt and error != 100:
            Timer = input.running_time() - Start
            Cal_Error()
def Read5ADC():
    global ค่าแสงP0, ค่าแสงP1, ค่าแสงp2, ค่าแสงP3, ค่าแสงP4
    ค่าแสงP0 = MySensor.analog_read(MySensor.analogPort.P0)
    ค่าแสงP1 = MySensor.analog_read(MySensor.analogPort.P1)
    ค่าแสงp2 = MySensor.analog_read(MySensor.analogPort.P2)
    ค่าแสงP3 = MySensor.analog_read(MySensor.analogPort.P3)
    ค่าแสงP4 = MySensor.analog_read(MySensor.analogPort.P4)
def Trac_PID():
    global Output, Left_Speed, Right_Speed, Pre_error, Sum_error
    Initial_Speed()
    Output = Kp * error + (Ki * Sum_error + Kd * (error - Pre_error))
    Left_Speed = Base_Left_Speed + Output
    Right_Speed = Base_Right_Speed - Output
    if Left_Speed > 0:
        if Left_Speed > Max_Speed:
            Left_Speed = Max_Speed
        iBIT.set_motor(ibitMotorCH.M1, ibitMotor.FORWARD, Left_Speed)
    else:
        if abs(Left_Speed) > Max_Speed:
            Left_Speed = Max_Speed
        iBIT.set_motor(ibitMotorCH.M1, ibitMotor.BACKWARD, abs(Left_Speed))
    if Right_Speed > 0:
        if Right_Speed > Max_Speed:
            Right_Speed = Max_Speed
        iBIT.set_motor(ibitMotorCH.M2, ibitMotor.FORWARD, Right_Speed)
    else:
        if abs(Right_Speed) > Max_Speed:
            Right_Speed = Max_Speed
        iBIT.set_motor(ibitMotorCH.M2, ibitMotor.BACKWARD, abs(Right_Speed))
    Pre_error = error
    Sum_error += error

def on_button_pressed_b():
    Show5ADC()
input.on_button_pressed(Button.B, on_button_pressed_b)

def Robot_Start():
    Forward()
    basic.pause(500)
def Box3():
    global Trac_Time
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
def Kick():
    iBIT.motor_stop()
    iBIT.servo(ibitServo.SV1, 70)
    basic.pause(300)
    iBIT.servo(ibitServo.SV1, 125)
def Cal_Error():
    global error
    Read5ADC()
    if ค่าแสงP1 > Ref_P1 and (ค่าแสงP0 < Ref_P0 and (ค่าแสงP3 > Ref_P2 and (ค่าแสงP4 > Ref_P3 and ค่าแสงP4 > Ref_P4))):
        error = 3
    else:
        if ค่าแสงP1 < Ref_P1 and (ค่าแสงP0 < Ref_P0 and (ค่าแสงP3 > Ref_P2 and (ค่าแสงP4 > Ref_P3 and ค่าแสงP4 > Ref_P4))):
            error = 2
        else:
            if ค่าแสงP1 < Ref_P1 and (ค่าแสงP0 > Ref_P0 and (ค่าแสงP3 > Ref_P2 and (ค่าแสงP4 > Ref_P3 and ค่าแสงP4 > Ref_P4))):
                error = 1
            else:
                if ค่าแสงP1 > Ref_P1 and (ค่าแสงP0 > Ref_P0 and (ค่าแสงP3 > Ref_P2 and (ค่าแสงP4 > Ref_P3 and ค่าแสงP4 > Ref_P4))):
                    error = 0
                else:
                    if ค่าแสงP1 > Ref_P1 and (ค่าแสงP0 > Ref_P0 and (ค่าแสงP3 > Ref_P2 and (ค่าแสงP4 > Ref_P3 and ค่าแสงP4 < Ref_P4))):
                        error = -1
                    else:
                        if ค่าแสงP1 > Ref_P1 and (ค่าแสงP0 > Ref_P0 and (ค่าแสงP3 > Ref_P2 and (ค่าแสงP4 < Ref_P3 and ค่าแสงP4 < Ref_P4))):
                            error = -2
                        else:
                            if ค่าแสงP1 > Ref_P1 and (ค่าแสงP0 > Ref_P0 and (ค่าแสงP3 > Ref_P2 and (ค่าแสงP4 < Ref_P3 and ค่าแสงP4 > Ref_P4))):
                                error = -3
                            else:
                                if ค่าแสงP3 < Ref_P2:
                                    error = 100
def Box2():
    global Trac_Time
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
def Initial_Speed():
    global Base_Left_Speed, Base_Right_Speed, Max_Speed
    Base_Left_Speed = Base_Speed - 0
    Base_Right_Speed = Base_Speed - 1
    Max_Speed = Base_Speed
def Show5ADC():
    Read5ADC()
    basic.show_number(ค่าแสงP0)
    basic.pause(1000)
    basic.show_number(ค่าแสงP1)
    basic.pause(1000)
    basic.show_number(ค่าแสงp2)
    basic.pause(1000)
    basic.show_number(ค่าแสงP3)
    basic.pause(1000)
    basic.show_number(ค่าแสงP4)
def Backward():
    MyRobotBit.motor_ab(motorDIR.REVERSE, 50, 50)
Max_Speed = 0
Base_Right_Speed = 0
Right_Speed = 0
Base_Left_Speed = 0
Left_Speed = 0
Pre_error = 0
Sum_error = 0
Output = 0
ค่าแสงP4 = 0
ค่าแสงP3 = 0
ค่าแสงp2 = 0
ค่าแสงP1 = 0
ค่าแสงP0 = 0
error = 0
Trac_Time = 0
Timer = 0
Start = 0
Ref_P4 = 0
Ref_P3 = 0
Ref_P2 = 0
Ref_P0 = 0
Ref_P1 = 0
Kt = 0
Ki = 0
Kd = 0
Kp = 0
Base_Speed = 0
Slow_Speed = 0
ACC_Speed = 0
Speed = 0
Speed = 60
ACC_Speed = 80
Slow_Speed = 50
Base_Speed = Speed
Turn_Speed = 60
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
basic.show_icon(IconNames.NO)