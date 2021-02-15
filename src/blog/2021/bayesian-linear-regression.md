---
path: "/blog/2021-bayesian-linear-regression"
date: "2021-02-12"
title: "Bayesian Linear Regression"
---

## Linear Regression

Consider a dataset $\mathcal{D} = \{ ( \mathbf x_i, y_i ) \}_{i=1}^n$. Let $\mathbf X \in \reals^{n \times d }$ and $\mathbf y \in \reals^n$. Our goal is to learn $\mathbf w \in \reals^d$  s.t. 


$$
\mathbf{\hat{w}} \leftarrow \argmin_{\mathbf  w} \frac{1}{n} \sum_{i=1}^n (\mathbf X \mathbf w  - \mathbf y)^T (\mathbf X \mathbf w - \mathbf y).
$$


In fact, this mean-squared error comes from the fact that we assume 


$$
y = \mathbf x^T \mathbf w^* + \epsilon,
$$


where $\epsilon \sim \mathcal{N}(0, \sigma^2)$ and $\mathbf w^*$ is the oracle weight.  With this assumption, we can see that 


$$
y \sim \mathcal{N}(\mathbf x^T \mathbf w, \sigma^2).
$$


Thus, we have 


$$
p(y|\mathbf x, \mathbf w) = \frac{1}{Z_x} \exp\bigg( - \frac{ (y - \mathbf w^T \mathbf x )^2}{2\sigma^2}\bigg),
$$


where $Z_x$  is the normalizer of the Gaussian distribution. If we assume that $(\mathbf x_i, y_i)$'s are independent and identically distributed, we have 


$$
p(\mathcal D | \mathbf w) = \prod_{i=1}^n p(y_i | \mathbf x_i \mathbf w).
$$


Taking the log and negate the term yields the objective we have just mentioned.  The approach based on optimizing $p(\mathcal D | \mathbf w)$   is called maximum likelihood estimation, which yields a point estimate  $\mathbf{\hat{w}}$. 

## Posterior Distribution

However, in many applications, we just do not want only $\mathbf{\hat{w}}$ but rather the distribution of $\mathbf w$  given the data to estimate (epstemic) uncertainty of the prediction. This distribution is called the posterior distribution, and it can be computed via


$$
p(\mathbf w | \mathcal D ) = \frac{ p(\mathcal D | \mathbf w) p(\mathbf w)}{p(\mathcal D)}.
$$


This is essentially the Bayes' rule. One can see that $p(\mathcal D ) = \int p(\mathcal D| \mathbf w) p(\mathbf w) d\mathbf w$  can be hard to compute; however, this can be done (analytically) with proper assumptions. In particular, we might choose $p(\mathbf w)$ that is structurally comparable with $p(\mathcal D | \mathbf w)$; noting that the technical term is conjugate.  For example, if our $p(y|\mathbf x ,\mathbf w)$ is a Gaussian, we might assume that $p(\mathbf w ) = \mathcal{N} (0, \Sigma_w),$  where $\Sigma_w =  \sigma_w^2I_d$. With this choice of prior, we have 


$$
\begin{aligned}
p(\mathcal D | \mathbf w) p(\mathbf w) &= \prod_{i=1}^n p(y_i | \mathbf x_i, \mathbf w) p(\mathbf w) \\
&=\bigg [ \prod_{i=1}^n \frac{1}{Z_x} \exp\bigg( - \frac{(y_i - \mathbf w^T \mathbf x_i)^2}{2\sigma^2} \bigg) \bigg] \frac{1}{Z_w} \exp \bigg(\frac{ - \mathbf w^T \Sigma_w^{-1} \mathbf w  }{2}\bigg) \\
&\propto_{\mathbf w}\exp\bigg( - \frac{1}{2\sigma^2}  \sum_{i=1}^n  (\mathbf w^T \mathbf x_i \mathbf x_i^T \mathbf w - 2y_i\mathbf w^T \mathbf x_i + y_i^2)  - \frac{ \mathbf w^T \Sigma_w^{-1} \mathbf w }{2} \bigg)  \\
&\propto_{\mathbf w} \exp\bigg( - \frac{1}{2} \bigg( \mathbf w^T \bigg(  \frac{1}{\sigma^2}  \sum_{i=1}^n    \mathbf x_i \mathbf x_i^T \bigg) \mathbf w  + \mathbf w^T \Sigma_w^{-1} \mathbf w  - \frac{2}{\sigma^2} \mathbf w^T \mathbf X^T \mathbf y \bigg) + C\bigg)  \\
&\propto_{\mathbf w} \exp\bigg( - \frac{1}{2} \bigg( \mathbf w^T \bigg(  \frac{1}{\sigma^2}  \mathbf X^T \mathbf X + \Sigma_w^{-1} \bigg) \mathbf w   - \frac{2}{\sigma^2} \mathbf w^T \mathbf X^T \mathbf y \bigg) \bigg),
\end{aligned}
$$


where $C$  is a constant when marginalizing out $\mathbf w$ . From this, the posterior distribution is in a multivariate  Gaussian whose covariance is


$$
\Sigma' = \bigg( \frac{1}{\sigma^2} \mathbf X^T \mathbf X  + \Sigma^{-1}_w \bigg)^{-1}.
$$


When expanding the density of multivariate Gaussian $\mathcal{N}(\mu', \Sigma')$, we know that 


$$
\begin{aligned}
\Sigma'^{-1} \mu' &= \frac{\mathbf X^T \mathbf y}{\sigma^2} \\
\mu' &=  \frac{\Sigma' \mathbf X^T y }{\sigma^2}.
\end{aligned}
$$


Therefore, we can conclude that 


$$
p(\mathbf w | \mathcal D) = \mathcal{N}\bigg( \underbrace{ \frac{\Sigma' \mathbf X^T y }{\sigma^2}}_{\mu'}, \underbrace{\bigg( \frac{1}{\sigma^2} \mathbf X^T \mathbf X  + \Sigma^{-1}_w \bigg)^{-1} }_{\Sigma'}\bigg).
$$


## Predictive Mean and Variance

Consider a new sample $\mathbf x^*$. We would like to know its prediction according to the posterior (i.e. averaging across all possible $\mathbf w )$ and its variance which is the uncertainty of the prediction. In particular, we know that 


$$
\begin{aligned}
p(y | \mathbf x^*, \mathcal D) &= \int p(y, \mathbf w | \mathbf x^*, \mathcal D) d\mathbf w \\
&= \int p(y| \mathbf w , \mathbf x^*, \mathcal D) p(\mathbf w| \mathbf x^*, \mathcal D) d\mathbf w \\
&\overset{(\dagger)}{=} \int p(y| \mathbf w , \mathbf x^*) p(\mathbf w| \mathcal D) d\mathbf w,
\end{aligned}
$$


where $(\dagger)$ is based on the assumptions that (1) the new prediction and the data $\mathcal D$ given the model's parameters and (2) our model's parameters are independent of the new sample $\mathbf x^*$  given the data $\mathcal D$. Because both terms in the integral are Gaussian, this distribution of the prediction is also a Gaussian. Let assume $p(y_*|\mathbf x_*, \mathcal D) = \mathcal N (\mu_*, \sigma_*^2)$. Writing the two term together, we get 


$$
\begin{aligned}
p(y_*|\mathbf x_*, \mathcal D) &= \int p(y|\mathbf w, \mathbf x_*) p(\mathbf w | \mathcal D) d\mathbf w \\
&\propto_y \int \exp \bigg( - \frac{(y_*-\mathbf w^T \mathbf x_*)^2}{2\sigma^2}\bigg) \exp\bigg( -\frac{(\mathbf w - \mu')^T\Sigma'^{-1}(\mathbf w - \mu')}{2}  \bigg) d \mathbf w \\
&\propto_y \int \exp \bigg( - \frac{(y_* - \mathbf w^T \mathbf x_*)^2}{2\sigma^2} -\frac{(\mathbf w - \mu')^T\Sigma'^{-1}(\mathbf w - \mu')}{2}  \bigg) d \mathbf w.
\end{aligned}
$$


Expanding the term inside the exponent yields


$$
\begin{aligned}
(y_* - \mathbf w^T \mathbf x)^2 &= (y_*)^2 - 2\mathbf w^T \mathbf x_* y_* + (\mathbf w^T \mathbf x_*)^2 \\
(\mathbf w - \mu')\Sigma'^{-1} (\mathbf w - \mu')&= \mathbf w^T \Sigma'^{-1} \mathbf w - 2\mathbf w^T \Sigma'^{-1} \mu' +  \mu'^T \Sigma^{-1}\mu'.
\end{aligned}
$$


Thus, we have


$$
\begin{aligned}
p(y_* | \mathbf x_*, \mathcal D) \propto_y  \exp\bigg( - \frac{y_*^2}{2\sigma^2} \bigg) \int  \exp \bigg ( - \frac{1}{2} \bigg[ \mathbf w^T \bigg(\underbrace{ \Sigma'^{-1} + \frac{\mathbf x_* \mathbf x_*^T}{\sigma^2}}_{=:L} \bigg)\mathbf w    - 2\mathbf w^T \bigg( \frac{\mathbf x_* y_*}{\sigma^2} +\Sigma'^{-1}\mu' \bigg) \bigg]\bigg)    d\mathbf w.
\end{aligned}
$$


We can see that the exponent term inside the integrate is the form of Gaussian; in particular, this is 


$$
\mathcal{N}\bigg(\xi:=L^{-1}\bigg(\frac{\mathbf x_* y_*}{\sigma^2} + \Sigma'^{-1}\mu' \bigg),  L^{-1}\bigg),
$$


with an assumption that $L^{-1}$ exists. Because of the Gaussian form, we thus have 


$$
\begin{aligned}
p(y_* | \mathbf w, \mathbf x_*) &\propto_y \exp \bigg(- \frac{y_*^2}{2\sigma^2 } + \frac{\xi^T L \xi }{2} \bigg) \underbrace{\int \exp\bigg( -\frac{(\mathbf w - \xi)^T L (\mathbf w - \xi) }{2}  \bigg) d \mathbf w}_{1} \\
&\propto_y \exp \bigg(- \frac{y_*^2}{2\sigma^2 } + \frac{\xi^T L \xi }{2} \bigg) \\
&\propto_y \exp \bigg(- \frac{1}{2} \bigg [ \frac{y_*^2}{\sigma^2 } - \xi^T L \xi \bigg]  \bigg) .
\end{aligned}
$$


Because $L^{-1}$ is symmetric, i.e. $L^{-1} = (L^{-1})^T$, we can simplify $\xi ^T L \xi$ , yielding


$$
\begin{aligned}
\xi^T L \xi &= \bigg[L^{-1}\bigg(\frac{\mathbf x_* y_*}{\sigma^2} + \Sigma'^{-1}\mu'\bigg) \bigg]^T L \bigg[L^{-1}\bigg(\frac{\mathbf x_* y_*}{\sigma^2} + \Sigma'^{-1}\mu'\bigg) \bigg] \\
&= \bigg[L^{-1}\bigg(\frac{\mathbf x_* y_*}{\sigma^2} + \Sigma'^{-1}\mu'\bigg) \bigg]^T \bigg(\frac{\mathbf x_* y_*}{\sigma^2} + \Sigma'^{-1}\mu'\bigg)  \\
&= \bigg(\frac{(L^{-1} \mathbf x_*)^T \mathbf x_*}{\sigma^4} \bigg) y_*^2 + 2\bigg(\frac{(L^{-1}\mathbf x_*)^T \Sigma'^{-1}\mu' }{\sigma^2}\bigg) y_* + C \\
&= \bigg(\frac{\mathbf x_* ^T L^{-1} \mathbf x_*}{\sigma^4}\bigg)y_*^2 + 2 \bigg ( \frac{ \mathbf x_*^T L^{-1} \Sigma'^{-1} \mu '}{\sigma^2} \bigg)y_* + C.
\end{aligned}
$$


Combining all the results together we have 


$$
\begin{aligned}
p(y_* | \mathbf w, \mathbf x_*) &\propto_y \exp \bigg( - \frac{1}{2} \bigg[  \frac{1}{\sigma^2} \bigg ( 1 -  \frac{\mathbf x_*^T L^{-1} \mathbf x_*}{\sigma^2}  \bigg) y_*^2  - 2\bigg ( \frac{\mathbf x_*^T L^{-1}\Sigma'^{-1}\mu'}{\sigma^2} \bigg ) y_*\bigg] \bigg) \\
&= \mathcal{N}(\mu_{y_*}, \sigma_{y_*}^2),
\end{aligned}
$$


where we have


$$
\begin{aligned}
\sigma^2_{y_*} &= \bigg [ \frac{1}{\sigma^2} \bigg( 1 -  \frac{\mathbf x_*^T L^{-1} \mathbf x_*}{\sigma^2} \bigg)  \bigg]^{-1} \\
\mu_{y_*} &= \sigma_{y_*}^2 \bigg( \frac{\mathbf x_*^T L^{-1}\Sigma'^{-1}\mu'}{\sigma^2} \bigg ).
\end{aligned}
$$
These results can be further simplified by using [the Sherman–Morrison formula](https://en.wikipedia.org/wiki/Sherman–Morrison_formula#Application) (1). Denote $a=1/\sigma^2$. We have 

$$
\begin{aligned}
\mathbf x_*^T L^{-1} \mathbf x_* &= \mathbf x_*^T \bigg( \Sigma'^{-1} + a \mathbf x_* \mathbf x_*^T \bigg)^{-1} \mathbf x_*  \\
 &\overset{(1)}{=} \mathbf x_*^T \bigg( \Sigma' - \frac{a \Sigma' \mathbf x_* \mathbf x_*^T \Sigma'}{1+a \mathbf x_*^T\Sigma'\mathbf x_*} \bigg) \mathbf x_*  \\
 &= \mathbf x_*^T \Sigma' \mathbf x_* \bigg ( 1 - \frac{a\mathbf x_*^T \Sigma' \mathbf x_*}{1+a\mathbf x_*^T \Sigma' \mathbf x_*} \bigg) \\
 &= \frac{ \mathbf x_*^T \Sigma' \mathbf x_* }{1+a\mathbf x_*^T \Sigma' \mathbf x_*}.
\end{aligned}
$$

Therefore, 
$$
\begin{aligned}
\sigma_{y_*}^2 &= \bigg[ a \bigg( 1 - \frac{a\mathbf x_*^T \Sigma' \mathbf x_*}{1+a\mathbf x_*^T\Sigma' \mathbf x_*} \bigg) \bigg]^{-1} \\
&= \bigg [ \frac{a}{1+a\mathbf x_*^T \Sigma' \mathbf x_*} \bigg]^{-1} \\
&= \frac{1}{a} + \mathbf x_*^T \Sigma \mathbf x_* \\
&= \sigma^2 + \mathbf x_*^T \Sigma \mathbf x_*.
\end{aligned}
$$

Similary, we can follow the same steps for $\mu_{y_*}$,

$$
\begin{aligned}
\mu_{y_*} &= \sigma_{y_*}^2 \bigg( a \mathbf x_*^T L^{-1}\Sigma'^{-1}\mu' \bigg ) \\
&= \sigma_{y_*}^2 \bigg( a \mathbf x_*^T \bigg( \Sigma' -  \frac{ a\Sigma'\mathbf x_*\mathbf x_*^T \Sigma' }{1+a\mathbf x_*^T \Sigma' \mathbf x_* } \bigg)\Sigma'^{-1}\mu'\bigg) \\
&= \sigma_{y_*}^2 a\bigg( \mathbf x_*^T \mu'\bigg(\frac{1}{1+a\mathbf x^*\Sigma' \mathbf x} \bigg) \bigg) \\
&= \cancel{\sigma_{y_*}^2} \bigg( \mathbf x_*^T \mu'\bigg(\frac{1}{\cancel{\frac{1}{a}+\mathbf x^*\Sigma' \mathbf x}} \bigg) \bigg) \\
&= \mathbf x_*^T \mu'.
\end{aligned}
$$

These are the predictive variance and predictive mean for logistic regression with Gaussian prior, or ridge regression.

## Example
Now, it is time to put things together. We take a dataset and train a linear regression model on four different subsets. We assume that all train samples are in the range $[-1, 1]$, while test samples are $[-1.5, 1.5]$.

<div align="center">
  <img src="https://i.imgur.com/NHgHcsG.png"/>
  <div style="color: gray">Fig. 1: Ridge regression trained with data with different sizes; the more training the more certain prediction especially in the extrapolation regime.</div>
</div>
<br/>

From Fig. 1, we see the extrapolation effect in the range that our training data is not covered. Without the posterior distribution, we would not know how much we had the point-estimate of the solution (i.e. solutions of ML or MAP). Furthermore, as we have more training samples, our model does not only do well in the interpolation regime (where training data is covered) but also the extrapolation regime.

## Conclusion and References

Perhaps, in the next step, we shall look at classification tasks and how to estimate uncertainty of the prediction in such situations.

This post is my recap of [Yarin Gal's tutorial at SMILES 2019](https://www.youtube.com/watch?v=7p56lnNi74s). I also consulted [mathematicalmok's Youtube channel](https://www.youtube.com/watch?v=xyuSiKXttxw&list=PLD0F06AA0D2E8FFBA&index=62).

The figure is generated from [this Google Colab](https://colab.research.google.com/drive/1fRP-S6PXXx1RA5fgMuymkQZ75Sv2NupF#scrollTo=X1MGn8xNuzcO).