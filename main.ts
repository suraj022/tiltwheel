let L1 = 0
let R1 = 0
pause(1000)
MPU6050.initilize(
mpu6050_clockSource_t.MPU6050_CLOCK_PLL_XGYRO,
mpu6050_dps_t.MPU6050_SCALE_2000DPS,
mpu6050_range_t.MPU6050_RANGE_4G,
false
)
MPU6050.setKalmanfilterCoefficients(2, 2, 0.5)
let limit = 70
let kalmanfilter = MPU6050.newKalmanfilter(2, 2, 0.01)
let kalmanfilter2 = MPU6050.newKalmanfilter(2, 2, 0.01)
forever(function () {
    R1 = MPU6050.updateEstimate(kalmanfilter, input.touchA3.value())
    L1 = MPU6050.updateEstimate(kalmanfilter2, input.touchA0.value())
    gamepad.move(0, Math.map(Math.constrain(MPU6050.getangle(accAngles.PITCH, true), 0 - limit, limit), 0 - limit, limit, -127, 127), Math.map(Math.constrain(MPU6050.getangle(accAngles.ROLL, true), 0 - limit, limit), limit, 0 - limit, -127, 127))
    gamepad.move(1, Math.map(Math.constrain(R1, 500, 700), 500, 700, -127, 127), Math.map(Math.constrain(L1, 550, 750), 550, 750, -127, 127))
})
forever(function () {
    pins.LED.digitalWrite(true)
    pause(50)
    pins.LED.digitalWrite(false)
    pause(1500)
})
