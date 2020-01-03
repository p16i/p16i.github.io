---
path: "/blog/2019-parameter-estimation"
date: "2019-11-09"
title: "Parameter Estimation"
---

Statistical models often contain parameters that one need to estimate. Intuitively, the estimation might introduce bias to the results (calculation). Estimators that have biased results are called **"bias estimators"**.

<img src="https://i.imgur.com/H2fsd7C.png" style="zoom:50%;" />

Consider dataset $X = \{ x_i \}_{i=1}^N$ sampled from populartion that has mean $\mu$ and variance $\sigma^2$. The sample mean $\bar X = \frac{1}{n}\sum_i x_i$ is **unbias estimator** of $\mu$.
$$
\begin{aligned}
E[\bar X] &= E \bigg [\frac{1}{n} \sum_i x_i \bigg ] \\
&= \frac{1}{n} \sum_i E[x_i] \\
&= \frac{1}{n} \sum_i \mu \\
&= \mu
\end{aligned}
$$



For variance, we know that $Var(X) = E[X^2] - E[X]^2$; hence, $Var(\bar X) = E(\bar X ^2 ) - E[\bar X]^2$.

These two properties yield:

- $E[X^2] = \sigma^2 + \mu^2$;

- $E[\bar X^2] = \frac{\sigma^2}{n} + \mu^2$.

  

Consider the sample variance $S^2 = \frac{1}{Z}\sum_i (x_i - \bar X)^2$, where $Z$ is a normalization factor that we shall find. 
$$
\begin{aligned}
E \bigg[ \sum_i (x_i - \bar X)^2\bigg] &= E\bigg[ \sum_i x_i^2 - 2x_i \bar X + \bar X^2  \bigg]  \\
&= E \bigg[ \sum_i x_i^2 - 2 \bar X \sum_i x_i^2 + n\bar X^2 \bigg]  \\
&= E \bigg[ \sum_i x_i^2 - n \bar X^2 \bigg ] \\
&= E \bigg[ \sum_i x_i^2 \bigg ]  - n E \bigg[\bar X^2 \bigg ] \\
&= \sum_i E \bigg[ x_i^2 \bigg ] -  n E \bigg[\bar X^2 \bigg ] \\
&= n (\sigma^2 + \mu^2) - n(\frac{\sigma^2}{n}  + \mu^2) \\
&= (n-1) \sigma ^2
\end{aligned}
$$
Therefore, $Z = (n-1)$ yields an unbiased estimator of $\sigma^2$. 