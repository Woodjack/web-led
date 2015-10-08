// Wesley Aptekar-Cassels
// Based on "Web Connected LED" example code

int led = D7;
bool ledState = FALSE;

void setup()
{
    pinMode(led, OUTPUT);
    digitalWrite(led, LOW);
    ledState = FALSE;

    Spark.function("led",setLEDState);
}


void loop()
{
   // Nothing to do here
}

int setLEDState(String command) { // "led" spark function
    if (command == "on") {
        digitalWrite(led,HIGH);
        ledState = TRUE;
    }
    else if (command == "off") {
        digitalWrite(led,LOW);
        ledState = FALSE;
    }
    else if (command == "toggle") {
        digitalWrite(led, ledState ? LOW : HIGH);
        ledState = !ledState;
    }
    return ledState ? 1 : 0;
}
