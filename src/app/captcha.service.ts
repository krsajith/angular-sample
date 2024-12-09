import { Injectable } from '@angular/core';
import { BoundedArray, MouseMove } from './bounded-array';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  u02751222abcd = 'YourSecretKey12345678901234567890123'

  mouseMoves = new BoundedArray(50);

  addMouseMove(move: MouseMove) {
    this.mouseMoves.push(move)
  }

  encryptData(data:string) {
    // Convert the secret key to bytes (must be 32 bytes for AES-256)
    const keyBytes = new TextEncoder().encode(this.u02751222abcd);
    const key = crypto.subtle.importKey(
      "raw",
      keyBytes.slice(0, 32), // Ensure key is exactly 32 bytes
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );

    return key.then(cryptoKey => {
      // Generate random IV (Initialization Vector)
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Convert data to bytes
      const dataBytes = new TextEncoder().encode(data);

      // Encrypt the data
      return crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        cryptoKey,
        dataBytes
      ).then(encrypted => {
        // Combine IV and encrypted data
        const encryptedArray = new Uint8Array(encrypted);
        const combined = new Uint8Array(iv.length + encryptedArray.length);
        combined.set(iv);
        combined.set(encryptedArray, iv.length);

        // Convert to Base64 for transmission
        return btoa(String.fromCharCode(...combined));
      });
    });
  }
}
