

class DeviceUtil {

    constructor() {
        this.mac = '';
        this.ssid = '';
        this.imei = '';
        this.idfa = '';
        this.uuid = '';
        this.code = '';
        this.mobile = '';
        this.isAutoFlll = false;
        this.keyword = '';
    }


     setMac(mac){
         console.log('DeviceUtil+setMac'+mac);
        this.mac = mac;
    }

    setSsid(ssid){
        this.ssid = ssid;
    }

    setImei(imei){
        this.imei = imei;
    }

    setIdfa(idfa){
        console.log('DeviceUtil+setIdfa'+idfa);

        this.idfa = idfa;
    }

    setUuid(uuid){
        this.uuid = uuid;
    }

    setCode(code){
        this.code = code;
    }

    setMobile(mobile){
        this.mobile = mobile;
    }

    setIsAutoFlll(isAutoFlll){
        this.isAutoFlll = isAutoFlll;
    }

    setKeyword(keyword){
        this.keyword = keyword;
    }

    getMac() {
        console.log('DeviceUtil+getMac'+this.mac);
        return this.mac == null ? '':this.mac;
    }

    getSsid () {
        console.log('DeviceUtil+getSsid'+this.ssid);
        return this.ssid == null ? '':this.ssid;
    }

    getImei () {
        console.log('DeviceUtil+getImei'+this.imei);
        return this.imei == null ? '':this.imei;
    }

    getIdfa(){
        console.log('DeviceUtil+getIdfa'+this.idfa);
        return this.idfa == null ? '':this.idfa;
    }

    getUuid(){
        console.log('DeviceUtil+getUuid'+this.uuid);
        return this.uuid == null ? '':this.uuid;
    }

    getCode(){
        console.log('DeviceUtil+getCode'+this.code);
        return this.code == null ? '':this.code;
    }

    getMobile(){
        console.log('DeviceUtil+getMobile'+this.mobile);
        return this.mobile == null ? '':this.mobile;
    }

    getAutoFill(){
        console.log('DeviceUtil+getAutoFill'+this.isAutoFlll);
        return this.isAutoFlll;
    }

    getKeyword(){
        console.log('DeviceUtil+getKeyword'+this.keyword);
        return this.keyword;
    }



};


module.exports = new DeviceUtil();


