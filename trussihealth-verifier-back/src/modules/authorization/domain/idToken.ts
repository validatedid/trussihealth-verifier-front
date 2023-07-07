export class IdToken {
  private idTokenParsed: any;
  constructor(private idToken: string) {
    this.idTokenParsed = this.parseJWT();
  }

  private parseJWT(): any {
    const base64Payload = this.idToken.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }

  getVerifiableCredential(): object | boolean {
    if (
      'vp' in this.idTokenParsed &&
      'verifiableCredential' in this.idTokenParsed['vp'] &&
      this.idTokenParsed['vp']['verifiableCredential'].length > 0
    ) {
      if (
        'payload' in this.idTokenParsed['vp']['verifiableCredential'][0] &&
        'vc' in this.idTokenParsed['vp']['verifiableCredential'][0]['payload']
      ) {
        return this.idTokenParsed['vp']['verifiableCredential'][0]['payload'][
          'vc'
        ];
      }
      return this.idTokenParsed['vp']['verifiableCredential'][0];
    }
    return false;
  }
}
