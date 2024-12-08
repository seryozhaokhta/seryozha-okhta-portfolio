// src/assets/shader.frag

  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform vec2 iResolution;
  uniform vec2 iMouse;
  uniform float iTime;
  uniform int noctaves;
  uniform float c[13]; // Размер массива c
  uniform float smoothstepLow;
  uniform float smoothstepHigh;
  uniform float colorExponent;
  uniform float theme; // Числовое значение темы (0.0 - день, 1.0 - ночь)

  float noise(in vec2 x) {
    return sin(1.5 * x.x) * sin(1.5 * x.y);
  }

  const mat2 rot = mat2(0.80, 0.6, -0.6, 0.8);

  float fbm(in vec2 _st) {
    float v = 0.0;
    float a = 0.6;
    vec2 shift = 10.0 * vec2(c[11], c[12]);
    for (int i = 0; i < 12; ++i) {
      if (i >= noctaves) break;
      v += a * noise(_st);
      _st = rot * _st * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 st = (-iResolution.xy + 2.0 * gl_FragCoord.xy) / iResolution.y;
    vec3 color = vec3(0.0);
    vec2 q = vec2(0.0);
    q.x = fbm(st + vec2(c[0], c[1] * 0.01 * iTime));
    q.y = fbm(st + vec2(c[2], c[3]));
    vec2 r = vec2(0.0);

    r.x = fbm(st + 3.0 * q + vec2(c[5], c[6]));
    r.y = fbm(st + 6.0 * q * sin(0.01 * iTime) + vec2(c[8] * 0.05 * iTime, c[9]));
    float f = fbm(st + c[10] * (r + length(q)));

    color += smoothstep(vec3(smoothstepLow), vec3(smoothstepHigh), vec3(f));
    color = pow(color, vec3(colorExponent)); // Монохромный светящийся эффект

    // Плавная инверсия цвета в зависимости от темы
    color = mix(color, 1.0 - color, theme);

    gl_FragColor = vec4(color, 1.0);
  }