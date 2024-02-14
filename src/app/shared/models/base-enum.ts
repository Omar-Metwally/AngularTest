class BaseEnum {
    static values: { [key: string]: number } = {};
  
    static addValue(key: string, value: number) {
      this.values[key] = value;
    }
  }